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
import { CalendarX, UsersRound } from 'lucide-react'
StorageObj

function EmptyState({ icon: Icon, message }) {
  return (
    <div className="my-4 flex min-h-32 w-full items-center justify-center border border-neon-cyan/20 bg-bg-surface/60 px-4 py-8 text-center">
      <div className="flex flex-col items-center gap-3">
        <div className="flex h-11 w-11 items-center justify-center rounded-sm border border-neon-cyan/30 bg-neon-cyan/10 text-neon-cyan">
          <Icon size={22} strokeWidth={1.8} />
        </div>
        <p className="font-mono text-sm uppercase tracking-wider text-text-muted sm:text-base">
          {message}
        </p>
      </div>
    </div>
  )
}

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
      setPastEvent(past);
      setFutureEvent(future);
    }

    const getMember=async()=>{
      const result = await DatabaseObj.getAllRows({table:"memberprofile"});
      setmember(result.data);
    }
    getMember();
    getEvents();
  },[])

  const handelPastDelete=(data)=>{
    setPastEvent(data);
  }
  const handelFutureDelete=(data)=>{
    setFutureEvent(data);
  }

  const role=useSelector((state)=>state.auth.role);
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
          {pastEvent.length === 0 ? (
            <EmptyState icon={CalendarX} message="No past events are available" />
          ) : (
            <MarqueeImage onDelete={handelPastDelete} images={pastEvent} speed="10" />
          )}
        </div>
      </section>

      <section>
        <HorizontalLine title="Future Events..." status={role?.trim()==="admin" && "Add Event" || "Keep Eye"} />
        {futureEvent.length === 0 ? (
          <EmptyState icon={CalendarX} message="No future events are available" />
        ) : (
          <MarqueeImage onDelete={handelFutureDelete} images={futureEvent} speed="10" detail_status={true} />
        )}
      </section>

      <section id='about-us'>
        <HorizontalLine title="CRYX TEAM ARCHIVE..." status={role?.trim()==="admin" && "Add Member" || "Keep Eye"} />
        <div className='flex flex-wrap gap-4 justify-center sm:justify-start'>
          {member.length === 0 ? (
            <EmptyState icon={UsersRound} message="No members are available" />
          ) : (
            member.map((t,idx) => <TeamCard key={t.id} data={t} idx={idx} />)
          )}
        </div>
      </section>

      <div className="h-16"></div>
    </div>
  )
}
