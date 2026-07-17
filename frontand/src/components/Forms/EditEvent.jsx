import { useForm } from "react-hook-form";
import Input from "../Input";
import Button from "../Button/Button";
import StorageObj from "../../../Supabase/storage";
import DatabaseObj from "../../../Supabase/database";
import { useNavigate, useParams } from "react-router-dom";
import { useState,useEffect } from "react";
import Loader from '../Loader';
import { useSelector ,useDispatch} from "react-redux";
import { setNotification } from "../../../store/Notifucation";
export default function EditEvent(){
  const tempurl="https://www.theclassictemplates.com/cdn/shop/articles/cyber-security-website-templates_95abbf65-cd60-40fb-8969-27337e464740.jpg?v=1772193841&width=1100"
    const {handleSubmit,register,reset}=useForm();
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const userId=useSelector((state)=>state.auth?.user?.id);
    const [loader,setLoader]=useState(false);
    const {eventId}=useParams();
    const [event,setEvent]=useState({});
    const [currentImage, setCurrentImage] = useState("");
    const [isEditing , setIsEditing]=useState(false);
const Edit = async (data) => {
  // setLoader(true);
  setIsEditing(true);
  try {
    // Keep previous image by default
    let imageurl = event.imageurl;
    let publicurl = event.publicurl;

    // Upload new image if selected
    if (data.image?.length > 0) {
      const file = data.image[0];
      const path = `${userId}/${file.name}`;

      const uploadResult = await StorageObj.uploadFile({
        bucket: "eventimage",
        file,
        path,
      });

      if (!uploadResult) {
        dispatch(
          setNotification({
            type: "error",
            title: "Update Event",
            message: "Failed to upload new event banner.",
          })
        );
        setLoader(false);
        return;
      }

      const urlResult = await StorageObj.getPublicUrl({
        bucket: "eventimage",
        path,
      });

      imageurl = path;
      publicurl = urlResult?.publicUrl || tempurl;

      // Delete previous image only after successful upload
      if (event.imageurl) {
        await StorageObj.deleteFile({
          bucket: "eventimage",
          path: event.imageurl,
        });
      }
    }

    const finalData = {
      title: data.title,
      discription: data.discription || null,
      date: data.date || null,
      time: data.time || null,
      place: data.place || null,
      highlight: data.highlight || null,
      driveLink: data.driveLink || null,
      imageurl,
      publicurl,

      // preserve registrations
      registrations: event.registrations || [],
    };

    const result = await DatabaseObj.updateData({
      table: "event",
      id: eventId,
      data: finalData,
    });

    if (result && !result.error) {
      dispatch(
        setNotification({
          type: "success",
          title: "Update Event",
          message: "Event updated successfully.",
        })
      );

      navigate(`/event/${eventId}`);
    } else {
      dispatch(
        setNotification({
          type: "error",
          title: "Update Event",
          message: "Failed to update event.",
        })
      );
    }
  } catch (err) {
    console.error(err);

    dispatch(
      setNotification({
        type: "error",
        title: "Update Event",
        message: "Something went wrong.",
      })
    );
  }
  setIsEditing(false);
  // setLoader(false);
};

    useEffect(() => {
        const getEvent = async () => {
            const result = await DatabaseObj.getRow({
                bucket: "event",
                chake: ["id", eventId],
            });
            console.log("result",result);
            console.log("eventId",eventId);
            if (result) {
                reset({
                    title: result.title,
                    date: result.date,
                    time: result.time,
                    place: result.place,
                    discription: result.discription,
                    highlight: result.highlight,
                    driveLink: result.driveLink || "",
                });

                setCurrentImage(result.publicurl);
                setEvent(result);
            }
        }
        getEvent();
    },[])


    return !loader && (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-3 sm:px-4 py-6 animate-fade-in">
      <div className="w-full max-w-xl">
        {/* Add Event Card */}
        <div className="relative border border-border-subtle bg-[#0b0f19]/80 backdrop-blur-xl rounded-md overflow-hidden transition-all duration-500 hover:border-neon-green/30 group shadow-[0_0_40px_rgba(52,211,153,0.04)] hover:shadow-[0_0_50px_rgba(52,211,153,0.08)]">
          {/* Top Scanline Glow */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-60 transition-opacity duration-500 group-hover:opacity-100"></div>

          {/* Header Bar */}
          <div className="flex min-w-0 items-center justify-between gap-3 border-b border-border-subtle/50 bg-bg-elevated/40 px-4 py-3.5 sm:px-5">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-70 hover:opacity-100 hover:shadow-[0_0_6px_#ff5f56] transition-all duration-300"></span>
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-70 hover:opacity-100 hover:shadow-[0_0_6px_#ffbd2e] transition-all duration-300"></span>
              <span className="w-3 h-3 rounded-full bg-neon-green opacity-70 hover:opacity-100 hover:shadow-[0_0_6px_#34d399] transition-all duration-300"></span>
            </div>
            <span className="flex min-w-0 items-center gap-1.5 truncate font-mono text-xs tracking-widest text-text-muted select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-ping"></span>
              edit_event.sh //
            </span>
          </div>

          {/* Form Body */}
          <div className="p-6 md:p-8">
            {/* Lock Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full border border-neon-green/30 flex items-center justify-center animate-border-glow shadow-[0_0_15px_rgba(52,211,153,0.1)]"
                style={{ filter: "drop-shadow(0 0 8px rgba(52,211,153,0.15))" }}
              >
                <svg
                  className="w-8 h-8 text-neon-green"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="1.5"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    d="M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-center font-mono text-xl md:text-2xl font-bold text-neon-green tracking-wider mb-1 text-glow-green">
              EVENT CREATION ACCESS
            </h1>
            <p className="text-center text-text-muted font-mono text-xs tracking-wider mb-8">
              // Initialize parameters for the new cyber event
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(Edit)} className="space-y-5">
              <Input
                label="Title"
                placeholder="e.g. Cyber Security Summit"
                {...register("title", { required: true })}
              />

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Date"
                  type="date"
                  placeholder="02-1-2026"
                  {...register("date",{required:true})}
                />
                <Input
                  label="Time"
                  type="time"
                  placeholder="03:56"
                  {...register("time",{required:true})}
                />
              </div>

              <Input
                label="Place"
                type="text"
                placeholder="e.g. VLTC L-006"
                {...register("place",{required:true})}
              />

              <div className="flex flex-col">
                <label className="mb-2 font-mono text-sm uppercase tracking-wider text-neon-green" htmlFor="discription">
                  Description
                </label>
                <textarea 
                  className="min-h-28 w-full min-w-0 resize-y rounded-sm border border-[#1e2d3d] bg-[#0d1117]/80 px-4 py-3 font-mono text-sm text-text-primary placeholder-[#4a5568] outline-none transition-all duration-300 focus:border-neon-green focus:ring-1 focus:ring-neon-green focus:shadow-[0_0_10px_#00ff8833]"
                  id="discription" 
                  name="discription" 
                  rows="4" 
                  placeholder="Enter details of the event..."
                  {...register("discription")}
                ></textarea>
              </div>

              <Input
                label="Image Banner"
                type="file"
                className="file:mr-4 file:py-1.5 file:px-4 file:rounded-sm file:border file:border-neon-green/20 file:text-xs file:font-mono file:bg-neon-green/5 file:text-neon-green hover:file:bg-neon-green/15 hover:file:border-neon-green/60 file:cursor-pointer file:transition-all duration-300 text-text-muted text-sm border-dashed"
                {...register("image")}
              />

              <Input
                label="Highlights"
                type="text"
                placeholder="e.g. Hands-on labs, CTF competitions..."
                {...register("highlight")}
              />
              <Input
                label="drivelink"
                type="text"
                placeholder="e.g. Hands-on labs, CTF competitions..."
                {...register("driveLink")}
              />

              <Button
                type="submit"
                variant="filled"
                disabled={isEditing}
                className={`w-full py-3 mt-2 font-semibold tracking-widest text-base transition-all duration-300 flex items-center justify-center gap-2.5 ${
                  isEditing 
                    ? "cursor-not-allowed opacity-60" 
                    : "hover:shadow-[0_0_18px_rgba(52,211,153,0.35)] active:scale-[0.98]"
                }`}
              >
                {isEditing ? (
                  <div className="flex gap-1 justify-center items-center">
                    <svg 
                      className="animate-spin h-5 w-5 text-black" 
                      xmlns="http://www.w3.org/2000/svg" 
                      fill="none" 
                      viewBox="0 0 24 24"
                    >
                      <circle 
                        className="opacity-25" 
                        cx="12" 
                        cy="12" 
                        r="10" 
                        stroke="currentColor" 
                        strokeWidth="4"
                      ></circle>
                      <path 
                        className="opacity-75" 
                        fill="currentColor" 
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    EDITING...
                  </div>
                ) : (
                  "EDIT EVENT"
                )}
              </Button>
            </form>

            {/* Bottom text */}
            <div className="mt-6 text-center">
              <p className="text-text-dim font-mono text-xs tracking-wider">
                <span className="text-neon-green/50">›</span> Secured with end-to-end encryption
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) || <div className="flex justify-center items-center min-h-lvh">
          <Loader />
        </div>
}
