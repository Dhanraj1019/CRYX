import { useForm } from "react-hook-form"
import Input from "../Input";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import supabase from "../../../Supabase/Supabase";
import { useNavigate } from "react-router-dom";
import DatabaseObj from "../../../Supabase/database";
import Loader from '../Loader'
import { useSelector } from "react-redux";
import StorageObj from "../../../Supabase/storage";
export default function AddMember({data}){
    
    const userData=useSelector((state)=>state.auth.user);
    const navigate=useNavigate();
    const {handleSubmit,register,formState: { errors }} = useForm({
      values:{
        title: data?.title || "",
            date: data?.date || "",
            time: data?.time || "",
            place: data?.place || "",
            discription: data?.discription || "",
            heightlight:data.heightlight
      }
    });
    const [loader,setLoader]=useState(false);


    const update=async(data1)=>{
        if(data1){
          const file=data1.image;
          let data2=data;
          let fnfImage={imageurl:data.path,publicurl:data.publicurl};
          console.log("data1=",data1);
          if(file){
            const f=file[0];
            console.log("f=",f);
            const path=`${userData.id}/${f.name}`;
            console.log("final path = ",path);
            const result=await StorageObj.uploadFile({bucket:"eventimage",file:f,path});
            console.log("result = ",result);
            if(result){
              const publicurl=await StorageObj.getPublicUrl({bucket:"eventimage",path})
              console.log(publicurl);
              if(publicurl){
                fnfImage={imageurl:path,publicurl:publicurl.publicUrl};
                data2={title:data1.title,date:data1.date,time:data1.time,place:data1.place,discription:data1.discription,heighlight:data1.heightlight,...fnfImage};
                console.log("data2 at image ",data2);
              }
            }
          }
          else{
            data2={title:data1.title,date:data1.date,time:data1.time,place:data1.place,discription:data1.discription,heighlight:data1.heightlight,...fnfImage};
            console.log("in else image not ",data2);
          }
          console.log("data2 at last = ",data2);
          const fnf=await DatabaseObj.updateData({table:"event",data:data2,id:data.id})
          console.log("saved database in userprofile = ",fnf);
          navigate("/");
        }
    }


    return !loader && (
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-3 sm:px-4 py-4 animate-fade-in">
      <div className="w-full max-w-md">
        {/* Add Member Card */}
        <div className="border border-border-subtle bg-bg-surface/60 backdrop-blur-md rounded-sm overflow-hidden"
          style={{
            boxShadow: "0 0 20px rgba(52,211,153,0.05), 0 0 40px rgba(52,211,153,0.02)",
          }}
        >
          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-3 bg-bg-elevated border-b border-border-subtle">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56]"></span>
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e]"></span>
              <span className="w-3 h-3 rounded-full bg-neon-green"></span>
            </div>
            <span className="text-text-muted font-mono text-xs tracking-wider">
              update_event.sh
            </span>
          </div>

          {/* Form Body */}
          <div className="p-6 md:p-8">
            {/* Lock Icon */}
            <div className="flex justify-center mb-6">
              <div className="w-16 h-16 rounded-full border-2 border-neon-green/40 flex items-center justify-center animate-border-glow">
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
              ACCESS TERMINAL
            </h1>
            <p className="text-center text-text-muted font-mono text-xs tracking-wider mb-8">
              // Enter credentials to update event
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(update)} className="space-y-5">
                <Input
                label="Title"
                placeholder="event1"
                {...register("title", { required: true })}
              />

              <Input
                label="Date"
                type="date"
                placeholder="02-1-2026"
                {...register("date")}
              />
              <Input
                label="Time"
                type="time"
                placeholder="03:56"
                {...register("time")}
              />
              <Input
                label="Place"
                type="text"
                placeholder="VLTC L-006"
                {...register("place")}
              />
              <label className="mb-2 font-mono text-sm uppercase tracking-wider text-neon-green" htmlFor="discription">Discription</label>
              <textarea 
                className="w-full rounded-sm border border-[#1e2d3d] bg-[#0d1117] px-4 py-3 font-mono text-text-primary placeholder-[#4a5568] outline-none transition-all duration-300 focus:border-neon-green focus:ring-1 focus:ring-neon-green focus:shadow-[0_0_10px_#00ff8833]"
                id="discription" 
                name="discription" 
                rows="4" 
                placeholder="Type here..."
                {...register("discription")}
                ></textarea>
              <Input
                label="Image"
                type="file"
                {...register("image",{required:true})}
              />
              <Input
                label="Hight Lights"
                type="text"
                placeholder="importent...."
              />

              <Button
                type="submit"
                variant="filled"
                className="w-full py-3 mt-2 font-semibold tracking-widest text-base"
              >
                UPDATE Event
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