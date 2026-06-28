import { useEffect, useRef, useState } from "react";
import { Link, useParams } from "react-router-dom";
import DatabaseObj from "../../../Supabase/database";
import Loader from "../Loader";
import { useSelector,useDispatch } from "react-redux";
import Button from "../Button/Button";
import { setNotification } from "../../../store/Notifucation";
import RegistrationsModal from './RegistrationModal'
const formatEventDate = (date) => {
  if (!date) return "Date TBA";

  return new Intl.DateTimeFormat("en", {
    weekday: "short",
    day: "2-digit",
    month: "short",
    year: "numeric",
  }).format(new Date(`${date}T00:00:00`));
};

const formatEventTime = (time) => {
  if (!time) return "Time TBA";

  return new Intl.DateTimeFormat("en", {
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(`2000-01-01T${time}`));
};

const splitFeatures = (event) => {
  const value = event?.highlight || event?.heighlight || event?.features;

  if (!value) return [];
  if (Array.isArray(value)) return value.filter(Boolean);

  return String(value)
    .split(/[\n,|]+/)
    .map((item) => item.trim())
    .filter(Boolean);
};

export default function EventDetails() {
  const dispatch=useDispatch();
  const { eventId } = useParams();
  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [notFound, setNotFound] = useState(false);
  const [modalStatus,setModalStatus]=useState(false);
  const [modalData,setModalData]=useState([]);
  const [registeredStatus,setRegisteredStatus]=useState(false);
  const user=useSelector((state)=>state.auth.user);
  useEffect(() => {
    const getEvent = async () => {
      setLoading(true);
      setNotFound(false);

      const result = await DatabaseObj.getRow({
        bucket: "event",
        chake: ["id", eventId],
      });

      setEvent(result || null);
      // console.log(result);
      console.log(result.registrations);
      // console.log(user);
      result.registrations?.map((it)=>{
        if(it.username===user.username) {
          // console.log("in setregistredstatus ")
          setRegisteredStatus(true);
        }
      })
      setModalData(result.registrations);
      setNotFound(!result);
      setLoading(false);
    };

    if (eventId) getEvent();
  }, [eventId]);

  if (loading) {
    return (
      <div className="flex min-h-[calc(100vh-120px)] items-center justify-center">
        <Loader />
      </div>
    );
  }

  if (notFound) {
    return (
      <div className="mx-auto flex min-h-[calc(100vh-120px)] max-w-3xl flex-col items-center justify-center px-4 text-center">
        <p className="font-mono text-xs uppercase tracking-[4px] text-neon-red">
          Event not found
        </p>
        <h1 className="mt-4 font-mono text-2xl font-bold uppercase tracking-wider text-text-primary">
          No event details available
        </h1>
        <Link
          to="/home"
          className="mt-6 rounded-sm border border-neon-cyan/60 px-5 py-2 font-mono text-xs font-bold uppercase tracking-[2px] text-neon-cyan transition-all duration-300 hover:bg-neon-cyan hover:text-black"
        >
          Back Home
        </Link>
      </div>
    );
  }

  const features = splitFeatures(event);

  const handelRegister=async()=>{
    // console.log(event);
    const temp=event.registrations;
    const t={id:user.id,username:user.username,fullname:user.firstName+ " " +user.lastName,phone:user.phone,email:user.email,date: new Date().toISOString()};
    let fnf;
    if(!temp) fnf=[t];
    else fnf=[...temp,t];
    // console.log("fnf",fnf);
    const d={...event,registrations:fnf};
    // console.log("d = ",d);
    const result = await DatabaseObj.updateData({table:"event",data:d,id:event.id});
    // console.log(result);
    if(result.error){
      dispatch(setNotification({type:"error",title:"Registration",message:"error during registration"}));
      return;
    }
    else{
      setEvent(d);
      // console.log(d);
      setRegisteredStatus(true);
      setModalData(d.registrations);
      dispatch(setNotification({type:"success",title:"registration",message:"registered successfuly"}));
      return;
    }
  }

  const togalModalState=()=>{
    setModalStatus((pre)=>!pre);
    // console.log("clicked")
  }

  const handelRegisterUserDelete=async(data)=>{
    // console.log("deleted id is ",data);
    const temp=modalData.filter((it)=>it[data[0]]!==data[1]);
    const d={...event,registrations:temp};
    const result = await DatabaseObj.updateData({table:"event",data:d,id:event.id});
    if(result.error){
      dispatch(setNotification({type:"error",title:"Delete Registered User",message:"error during delete user"}))
    }
    else{
      setEvent(d);
      setModalData(temp);
      if(user[data[0]]===data[1]) {
        setRegisteredStatus(false);
        // console.log("in setregisteredstatus")
      }
      dispatch(setNotification({type:"success",title:"Delete Registered User",message:"registered user deleted"}));
    }
  }

  return (
    <main className="mx-auto max-w-7xl px-3 py-8 sm:px-4 md:px-8 md:py-12">
      <section className="overflow-hidden rounded-sm border border-border-subtle bg-bg-elevated/30 shadow-[0_0_40px_rgba(103,232,249,0.06)]">
        <div className="relative min-h-65 md:min-h-105">
          <img
            src={event.publicurl}
            alt={event.title || "CRYX event"}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-bg-primary via-bg-primary/75 to-black/25"></div>
          <div className="relative flex min-h-65 flex-col justify-end p-5 sm:p-8 md:min-h-105 md:p-10">
            <p className="font-mono text-xs uppercase tracking-[4px] text-neon-cyan">
              CRYX Event Access
            </p>
            <h1 className="mt-3 max-w-4xl font-mono text-2xl font-bold uppercase tracking-wider text-neon-green sm:text-4xl md:text-6xl">
              {event.title || "Untitled Event"}
            </h1>
          </div>
        </div>

        <div className="grid gap-6 p-5 sm:p-8 md:grid-cols-[1.1fr_0.9fr] md:p-10">
          <div>
            <h2 className="font-mono text-sm font-bold uppercase tracking-[3px] text-neon-cyan">
              Event Details
            </h2>
            <p className="mt-4 whitespace-pre-line font-mono text-sm leading-7 text-text-muted sm:text-base">
              {event.discription || "Full event description will be updated soon."}
            </p>

            {features.length > 0 && (
              <div className="mt-8">
                <h3 className="font-mono text-sm font-bold uppercase tracking-[3px] text-neon-green">
                  Features
                </h3>
                <div className="mt-4 flex flex-wrap gap-2">
                  {features.map((feature) => (
                    <span
                      key={feature}
                      className="rounded-sm border border-neon-green/30 bg-neon-green/5 px-3 py-1.5 font-mono text-xs uppercase tracking-wider text-neon-green"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </div>
            )}
          </div>

          <aside className="border border-border-subtle bg-[#0b0f19]/70 p-5">
            <div className="space-y-5">
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[3px] text-text-muted">
                  Date
                </p>
                <p className="mt-1 font-mono text-base font-bold text-text-primary">
                  {formatEventDate(event.date)}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[3px] text-text-muted">
                  Time
                </p>
                <p className="mt-1 font-mono text-base font-bold text-text-primary">
                  {formatEventTime(event.time)}
                </p>
              </div>
              <div>
                <p className="font-mono text-[10px] uppercase tracking-[3px] text-text-muted">
                  Place
                </p>
                <p className="mt-1 font-mono text-base font-bold text-text-primary">
                  {event.place || "Venue TBA"}
                </p>
              </div>
            </div>

            <div className="flex gap-4">
              <button
                onClick={handelRegister}
                disabled={registeredStatus}
                className={`mt-8 block w-full rounded-sm px-5 py-3 text-center font-mono text-sm font-bold uppercase tracking-[3px] transition-all duration-300 ${
                  registeredStatus
                    ? "cursor-not-allowed bg-gray-600 text-gray-300 opacity-70"
                    : "cursor-pointer bg-neon-green text-black hover:shadow-[0_0_22px_rgba(52,211,153,0.45)]"
                }`}
              >
                {registeredStatus ? "Already Registered" : "Register"}
              </button>
              {user.role==="admin" && <button
                onClick={togalModalState}
                className="mt-8 block cursor-pointer w-full rounded-sm bg-blue-600 px-5 py-3 text-center font-mono text-sm font-bold uppercase tracking-[3px] text-amber-100 transition-all duration-300 hover:shadow-[0_0_22px_rgba(52,211,153,0.45)]"
              >
                Registered
              </button>}
            </div>
          </aside>
        </div>
      </section>
      {modalStatus && <RegistrationsModal onDelete={handelRegisterUserDelete} data={modalData} onClose={togalModalState}/>}
    </main>
  );
}