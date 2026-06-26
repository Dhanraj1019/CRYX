import { useEffect, useState } from "react";
import PlatformSection from '../Resorces/Required/PlatformSection';
import Top from '../Resorces/Required/Top';
import Bottom from '../Resorces/Required/Bottom';
import Sticky from '../Resorces/Required/Sticky';
import DatabaseObj from "../../../Supabase/database";
import Button from "../../components/Button/Button";
import { useNavigate } from "react-router-dom";
import { useSelector,useDispatch } from "react-redux";
import { setNotification } from "../../../store/Notifucation";
export default function WeeklyLabs() {
  const navigate=useNavigate();
  const dispatch=useDispatch();
  const user_status=useSelector((state)=>state.auth?.user?.role);
  const [tryhackmeLabs,settryhackmeLabs] = useState([]);
  const [hacktheboxLabs,setHacktheboxLabs] = useState([]);
  const [picoCTFLabs,setPicoCTFLabs] = useState([]);
  const handelDelete=async(id,platform)=>{
    const result = await DatabaseObj.deleteRow({bucket:"WeaklyLabs",id:id});
    if(result){
      // console.log("deleted row in weakly labs.jsx file",id);
      if(platform==="tryhackme"){
        settryhackmeLabs((pre)=>pre.filter((p)=>p.id!==id))
      }
      else if(platform==="hackthebox"){
        setHacktheboxLabs((pre)=>pre.filter((p)=>p.id!==id));
      }
      else{
        setPicoCTFLabs((pre)=>pre.filter((p)=>p.id!==id));
      }
      dispatch(setNotification({title:"Delete Lab",message:"Lab deleted !"}))
    }
    else{
      dispatch(setNotification({title:"Delete Lab",message:"error during delete Lab please try again"}));
    }
  }

  useEffect(()=>{
      const getData=async()=>{
        const {data,error}=await DatabaseObj.getAllRows({table:"WeaklyLabs"});
        if(data){
          const tryhackme=data.filter((lab)=>lab.platform==="tryhackme");
          const hack=data.filter((lab)=>lab.platform==="hackthebox");
          const ctf=data.filter((lab)=>lab.platform==="picoctf");
          setHacktheboxLabs(hack);
          settryhackmeLabs(tryhackme)
          setPicoCTFLabs(ctf);
        }
        else{
          console.log("error = ",error);
        }
      }
      getData();
    },[]);

  const dynamicPlatforms = [
    {
      id: "tryhackme",
      name: "TryHackMe",
      shortName: "THM",
      tagline: "// Beginner-friendly guided rooms",
      color: "#34d399",
      accentColor: "#10b981",
      icon: "🟢",
      borderColor: "rgba(52,211,153,0.25)",
      bgColor: "rgba(52,211,153,0.05)",
      labs: tryhackmeLabs,
      logo: "THM",
    },
    {
      id: "hackthebox",
      name: "HackTheBox",
      shortName: "HTB",
      tagline: "// Real-world pentesting challenges",
      color: "#9fef00",
      accentColor: "#a3e635",
      icon: "🟩",
      borderColor: "rgba(163,230,53,0.25)",
      bgColor: "rgba(163,230,53,0.05)",
      labs: hacktheboxLabs,
      logo: "HTB",
    },
    {
      id: "picoctf",
      name: "PicoCTF",
      shortName: "PICO",
      tagline: "// CTF challenges for all skill levels",
      color: "#67e8f9",
      accentColor: "#22d3ee",
      icon: "🔵",
      borderColor: "rgba(103,232,249,0.25)",
      bgColor: "rgba(103,232,249,0.05)",
      labs: picoCTFLabs,
      logo: "CTF",
    },
  ];

  const features = [
    { label: "Total Labs", value: `${tryhackmeLabs.length + hacktheboxLabs.length + picoCTFLabs.length}+`, color: "#34d399" },
    { label: "TryHackMe", value: `${tryhackmeLabs.length}`, color: "#34d399" },
    { label: "HackTheBox", value: `${hacktheboxLabs.length}`, color: "#9fef00" },
    { label: "PicoCTF", value: `${picoCTFLabs.length}`, color: "#67e8f9" },
  ];

  return (
    <div className="max-w-7xl mx-auto px-3 sm:px-4 md:px-8 py-6 animate-fade-in">
      <Top features={features} />
      {user_status==="admin" &&
        <div className="flex justify-center pb-4 gap-6">
          <Button onClick={()=>navigate("/add-lab")} className="w-1/6 hover:shadow-green-400" children="Add Lab"/>
          <Button onClick={()=>navigate("/add-platform")} className="w-1/6 text-blue-600 border-blue-600 hover:shadow-blue-500" children="Add Platform"/>
        </div>
      }
      {/* Gradient divider */}
      <div className="h-px gradient-line opacity-40 mb-8" />

      <Sticky platforms={dynamicPlatforms} />

      {/* ── Platform Sections ── */}
      <div className="space-y-14 sm:space-y-20">
        {dynamicPlatforms.map((platform, index) => (
          <PlatformSection
            key={platform.id}
            platform={platform}
            index={index}
            onDelete={handelDelete}
          />
        ))}
      </div>

      <Bottom />

      <div className="h-16" />
    </div>
  );
}
