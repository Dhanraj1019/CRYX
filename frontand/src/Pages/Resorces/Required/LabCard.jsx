import { useEffect, useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import { setNotification } from "../../../../store/Notifucation";
import Button from '../../../components/Button/Button'
import DatabaseObj from "../../../../Supabase/database";
import SolvedModal from '../../../components/Marquee/RegistrationModal';
import { useNavigate } from "react-router-dom";
export default function LabCard({ lab, platform,onDelete }) {
  const difficultyConfig = {
    Easy: { color: "#34d399", bg: "rgba(52,211,153,0.1)", border: "rgba(52,211,153,0.3)" },
    Medium: { color: "#f59e0b", bg: "rgba(245,158,11,0.1)", border: "rgba(245,158,11,0.3)" },
    Hard: { color: "#f87171", bg: "rgba(248,113,113,0.1)", border: "rgba(248,113,113,0.3)" },
  };
  const navigate=useNavigate();
  const dispatch=useDispatch()
  const user=useSelector((state=>state.auth?.user));
  const loginStatus=useSelector((stat)=>stat.auth.status);
  const [mySolvedStatus,setMySolvedStatus]=useState(false);
  const diff = difficultyConfig[lab.difficulty] || difficultyConfig["Easy"];
  const [hovered, setHovered] = useState(false);
  const [solved,setSolved] = useState([]);
  const [modalState,setModalStatus] = useState(false);
  useEffect(()=>{
    if(user){
      const alreadySolved = lab.solved?.some(
        (it) => it?.id === user?.id || it?.username === user?.username
      );
      if (alreadySolved) setMySolvedStatus(true);
    }
  },[user])

  useEffect(()=>{
    setSolved(lab.solved);
  },[])

  const handleClick = () => {
    window.open(lab.url, "_blank", "noopener,noreferrer");
  };

const handelSolved=async()=>{
    if(!user) {
      dispatch(setNotification({type:"error",title:"Lab Solve",message:"Please Login First"}));
      navigate("/login");
      return;
    }
    handleClick();
    if(mySolvedStatus) return;
    const temp=lab.solved;
    const t={id:user.id,username:user.username,fullname:user.firstName+ " " +user.lastName,phone:user.phone,email:user.email,date: new Date().toISOString()};
    let fnf;
    if(!temp) fnf=[t];
    else fnf=[...temp,t];
    const d={...lab,solved:fnf};
    // console.log("d = ",d);
    const result = await DatabaseObj.updateData({table:"WeaklyLabs",data:d,id:lab.id});
    if(result.error){
      dispatch(setNotification({type:"error",title:"Solve",message:"error during lab solution"}));
      return;
    }
    else{
      console.log("fnf",fnf);
      setSolved(fnf);
      setMySolvedStatus(true);
      dispatch(setNotification({type:"success",title:"Solve",message:"lab solved successfuly"}));
      return;
    }
  }

  const togalModalState=()=>{
    setModalStatus((pre)=>!pre);
    // console.log(lab)
  }

  // const labdate=new Date(lab.date);
  // const today=Date.now();
  return (
    <div
      className="group relative flex min-w-0 flex-col overflow-hidden rounded-sm border bg-bg-surface/50 backdrop-blur-sm transition-all duration-500"
      style={{
        borderColor: hovered ? `${platform.color}50` : "rgba(52,211,153,0.1)",
        boxShadow: hovered ? `0 0 24px ${platform.color}18, 0 4px 20px rgba(0,0,0,0.3)` : "0 2px 8px rgba(0,0,0,0.2)",
        transform: hovered ? "translateY(-3px)" : "translateY(0)",
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      role="button"
      tabIndex={0}
      onKeyDown={(e) => e.key === "Enter" && handleClick()}
      aria-label={`Open ${lab.title} on ${platform.name}`}
    >
      {/* Top color accent */}
      <div
        className="h-0.5 w-full transition-all duration-500"
        style={{
          background: `linear-gradient(90deg, transparent, ${platform.color}, transparent)`,
          opacity: hovered ? 1 : 0.3,
        }}
      />

      {/* Card content */}
      <div className="flex min-w-0 flex-1 flex-col p-4 sm:p-5">
        {/* Header row */}
        <div className="mb-3 flex min-w-0 flex-wrap items-start justify-between gap-2">
          <div className="flex min-w-0 flex-wrap items-center gap-2">
            {/* Platform mini badge */}
            <span
              className="font-mono text-xs font-bold px-1.5 py-0.5 rounded-sm shrink-0"
              style={{
                color: platform.color,
                background: platform.bgColor,
                border: `1px solid ${platform.borderColor}`,
              }}
            >
              {platform.logo}
            </span>
            <span className="min-w-0 break-words font-mono text-xs tracking-wider text-text-muted">{lab.date}</span>
          </div>
          {/* Difficulty */}
          <span
            className="font-mono text-xs px-2 py-0.5 rounded-sm shrink-0"
            style={{
              color: diff.color,
              background: diff.bg,
              border: `1px solid ${diff.border}`,
            }}
          >
            {lab.difficulty}
          </span>
            
          {
            loginStatus && user?.role==="admin" && 
            <div className="flex w-full flex-wrap gap-2 sm:w-auto">
              <Button onClick={()=>onDelete(lab.id,lab.platform)} className="flex-1 border-amber-600 text-red-400 hover:shadow-[0_0_10px_rgba(225,11,3,0.3)] sm:flex-none">
                Delete 
              </Button>
              <Button onClick={()=>togalModalState()} className="flex-1 border-blue-600 font-bold text-blue-600 hover:shadow-blue-600 sm:flex-none">
                Solved
              </Button>
            </div>
          }
        </div>

        {/* Title */}
          <h4
            className="mb-2 break-words font-mono text-base font-semibold tracking-wider transition-all duration-300 sm:text-lg"
            style={{
              color: hovered ? platform.color : "#cbd5e1",
              textShadow: hovered ? `0 0 8px ${platform.color}40` : "none",
            }}
          >
            {lab.title}
          </h4>

        {/* Description */}
        <p className="mb-4 flex-1 break-words font-mono text-xs leading-relaxed text-text-muted">
          {lab.description}
        </p>

        {/* Tags */}
        <div className="mb-4 flex flex-wrap gap-1.5">
          {lab.tags.map((tag,idx) => (
            <span
              key={`${tag}-${idx}`}
              className="max-w-full break-words rounded-sm px-2 py-0.5 font-mono text-xs"
              style={{
                color: platform.color,
                background: `${platform.color}10`,
                border: `1px solid ${platform.color}25`,
              }}
            >
              {tag}
            </span>
          ))}
        </div>

        {/* CTA */}
        <div
          className="flex min-h-11 cursor-pointer items-center gap-2 rounded-sm border border-gray-400/20 px-4 py-2 font-mono text-xs uppercase tracking-wider transition-all duration-300 hover:shadow-sm hover:shadow-gray-600 active:scale-[0.99] focus-visible:ring-2"
          style={{ color: platform.color }}
          onClick={mySolvedStatus ? handleClick : handelSolved}
        >
          <span
            className="transition-transform duration-300"
            style={{ transform: hovered ? "translateX(4px)" : "translateX(0)" }}
          >
            ›
          </span>
          <span className="min-w-0 break-words">Open on {platform.name}</span>
          <span
            className="ml-auto text-base transition-all duration-300"
            style={{ opacity: hovered ? 1 : 0.5 }}
          >
            ↗
          </span>
        </div>
      </div>

      {/* Bottom glow line */}
      <div
        className="absolute bottom-0 left-0 h-px transition-all duration-700"
        style={{
          width: hovered ? "100%" : "0%",
          background: platform.color,
        }}
      />

      {/* Corner accent */}
      <div
        className="absolute top-0 right-0 w-6 h-6 transition-all duration-500"
        style={{
          borderTop: `1px solid ${platform.color}`,
          borderRight: `1px solid ${platform.color}`,
          opacity: hovered ? 0.6 : 0.15,
        }}
      />
      <div
        className="absolute bottom-0 left-0 w-6 h-6 transition-all duration-500"
        style={{
          borderBottom: `1px solid ${platform.color}`,
          borderLeft: `1px solid ${platform.color}`,
          opacity: hovered ? 0.6 : 0.15,
        }}
      />
      {modalState && <SolvedModal subtitle="Solved Users" title="Lab Solved" deleteStatus={false} onClose={togalModalState} data={solved}/>}
    </div>
  );
}
