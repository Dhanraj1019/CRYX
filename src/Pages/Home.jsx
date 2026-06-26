import Terminal from '../components/Terminal/Terminal'
import Welcome from '../components/Welcome'
import { motion } from 'motion/react'
import MarqueeImage from '../components/Marquee/MarqueeImage'
import HorizontalLine from '../components/HorizontalLine'
import TeamCard from '../components/Team/TeamCard'
import UnderDevelopment from '../components/UnderDevelopment'
import { useSelector } from "react-redux";
import DatabaseObj from '../../Supabase/database'
import { useEffect, useState } from 'react'
import StorageObj from '../../Supabase/storage'
StorageObj
export default function Home() {
  const [pastEvent,setPastEvent]=useState([]);
  const [member,setmember]=useState([]);
  const [futureEvent,setFutureEvent]=useState([]);
  useEffect(()=>{
    const getEvents=async()=>{
      const result=(await DatabaseObj.getAllRows({table:"event"})).data;
      const nowtime= Date.now();
      const future=result.filter((e)=>{
        const eventtime=new Date(
          `${e.date}T${e.time}`
        ).getTime();
        return eventtime>=nowtime;
      })
      const past=result.filter((e)=>{
        const eventtime=new Date(
          `${e.date}T${e.time}`
        ).getTime();
        return eventtime<nowtime;
      })
      // console.log("past = ",past);
      console.log("future = ",future);
      setPastEvent(past);
      setFutureEvent(future);
      // console.log("result in home page = ",result);
    }

    const getMember=async()=>{
      const result = await DatabaseObj.getAllRows({table:"memberprofile"});
      setmember(result.data);
    }
    getMember();
    getEvents();
  },[])

  // console.log("members = ",member);
  const role=useSelector((state)=>state.auth.role);
  // console.log("role = ",role);
  return (
    <div className='max-w-7xl mx-auto px-3 sm:px-4 md:px-8'>
      <Welcome />
      <section className="py-6">
        <Terminal />
      </section>

      <div className='h-px gradient-line my-12 md:my-16 opacity-30'></div>

      <section>
        <HorizontalLine title="CRYX EVENT ARCHIVE..." status= "Keep Eye" />
        <div className="py-4">
          <MarqueeImage images={pastEvent} speed="10" />
        </div>
      </section>

      <section>
        <HorizontalLine title="Future Events..." status={role?.trim()==="admin" && "Add Event" || "Keep Eye"} />
        <MarqueeImage images={futureEvent} speed="10" />
      </section>

      <section id='about-us'>
        <HorizontalLine title="CRYX TEAM ARCHIVE..." status={role?.trim()==="admin" && "Add Member" || "Keep Eye"} />
        <div className='flex flex-wrap gap-4 justify-center sm:justify-start'>
          {member?.map((t,idx) => <TeamCard key={t.id} data={t} idx={idx} />)}
        </div>
      </section>

      <div className="h-16"></div>
    </div>
  )
}