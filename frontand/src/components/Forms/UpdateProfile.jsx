import { useForm } from "react-hook-form"
import Input from "../Input";
import Button from "../Button/Button";
import { useEffect, useState } from "react";
import supabase from "../../../Supabase/Supabase";
import { useNavigate } from "react-router-dom";
import DatabaseObj from "../../../Supabase/database";
import Loader from '../Loader'
import { useSelector, useDispatch } from "react-redux";
import StorageObj from "../../../Supabase/storage";
import { setNotification } from "../../../store/Notifucation";
export default function AddMember(){
    const [data,setdata]=useState({});
    const [isUpdating, setIsUpdating] = useState(false);
    const redux_data=useSelector((state)=>state.auth.user);
    const dispatch=useDispatch();
    
    useEffect(()=>{
      setdata(redux_data);
    },[redux_data]);
    const navigate=useNavigate();
    const {handleSubmit,register,formState: { errors }} = useForm({
      values:{
        username: data?.username || "",
            email: data?.email || "",
            phone: data?.phone || null,
            instagramid: data?.instagramid || "",
            linkdinid: data?.linkdinid || "",
            firstName:data?.firstName || "",
            lastName:data?.lastName || ""
      }
    });
    const [loader,setLoader]=useState(false);

    // console.log("user redux data = ",redux_data)
    const update=async(data1)=>{
        if(data1){
          setIsUpdating(true);
          const file=data1.image;
          let data2=data;
          let fnfImage={imageurl:data.imageurl,publicurl:data.publicurl};
          if(file){
            const f=file[0];
            const path=`${data.id}/${f.name}`;
            const result=await StorageObj.uploadFile({bucket:"userimage",file:f,path});
            if(result){
              const publicurl=await StorageObj.getPublicUrl({bucket:"userimage",path})
              if(publicurl){
                fnfImage={imageurl:path,publicurl:publicurl.publicUrl};
                data2={username:data1.username,email:data1.email,instagramid:data1.instagramid,linkdinid:data1.linkdinid,phone:data1.phone?.trim() || null,firstName:data1.firstName,lastName:data1.lastName,...fnfImage};
              }
            } else {
              dispatch(setNotification({type:"error",message:"Failed to upload profile image",title:"Update Profile"}));
              setLoader(false);
              return;
            }
          }
          else{
            data2={username:data1.username,email:data1.email,instagramid:data1.instagramid,linkdinid:data1.linkdinid,phone:data1.phone?.trim() || null,firstName:data1.firstName,lastName:data1.lastName,...fnfImage};
          }
          const fnf=await DatabaseObj.updateData({table:"userprofile",data:data2,id:data.id})
          if(file &&
            file.length > 0 &&
            redux_data.publicurl &&
            fnf &&
            !fnf.error){
            const result = await StorageObj.deleteFile({bucket:"userimage",path:redux_data.imageurl});
          }
          console.log(fnf);
          if(redux_data.role==="admin" || redux_data.role==="exicutive"){
            const result = await DatabaseObj.updateData({table:"memberprofile",data:data2,id:data.id});
          }
          if(fnf && !fnf.error){
            setIsUpdating(false);
            dispatch(setNotification({type:"success",message:"Profile updated successfully",title:"Update Profile"}));
            navigate("/");
          } else {
            dispatch(setNotification({type:"error",message:"Failed to update profile, please try again",title:"Update Profile"}));
          }
        }
    }


    return !loader && (
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-3 sm:px-4 py-6 animate-fade-in">
      <div className="w-full max-w-xl">
        {/* Add Member Card */}
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
              update_profile.sh //
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
              PROFILE UPDATE
            </h1>
            <p className="text-center text-text-muted font-mono text-xs tracking-wider mb-8">
              // Enter credentials and update user telemetry details
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(update)} className="space-y-5">
                <Input 
                  label="Username [LOCKED]" 
                  className="cursor-not-allowed opacity-40 bg-[#060a12] border-slate-900 focus:shadow-none text-text-muted select-none" 
                  readOnly 
                  {...register("username")}
                />
                
                <Input 
                  label="Email Address [LOCKED]" 
                  className="cursor-not-allowed opacity-40 bg-[#060a12] border-slate-900 focus:shadow-none text-text-muted select-none" 
                  readOnly 
                  {...register("email")}
                />
                <Input 
                  label="First Name" 
                  placeholder="e.g. demo"
                  {...register("firstName")}
                />

                <Input 
                  label="Last Name" 
                  placeholder="e.g. omed"
                  {...register("lastName")}
                />
                <Input 
                  label="Phone Number" 
                  placeholder="e.g. 9876543210"
                  {...register("phone",{ 
                    pattern: {
                      value: /^[0-9]+$/,
                      message: "Please enter only numbers"
                    },
                    minLength: {
                      value: 10,
                      message: "Phone number must be exactly 10 digits"
                    },
                    maxLength: {
                      value: 10,
                      message: "Phone number must be exactly 10 digits"
                    }
                  })}
                />
                {errors.phone && (
                  <div className="border border-neon-red/30 bg-neon-red/5 px-4 py-2.5 rounded-sm font-mono text-xs text-neon-red shadow-[0_0_10px_rgba(248,113,113,0.05)] mt-1 select-none">
                    [!] ERROR: {errors.phone.message}
                  </div>
                )}

                <Input 
                  label="Instagram ID" 
                  placeholder="e.g. cyber_agent"
                  {...register("instagramid")}
                />

                <Input 
                  label="LinkedIn ID" 
                  placeholder="e.g. cyber-security-professional"
                  {...register("linkdinid")}
                />

                <Input 
                  label="Profile Image Banner" 
                  type="file" 
                  className="file:mr-4 file:py-1.5 file:px-4 file:rounded-sm file:border file:border-neon-green/20 file:text-xs file:font-mono file:bg-neon-green/5 file:text-neon-green hover:file:bg-neon-green/15 hover:file:border-neon-green/60 file:cursor-pointer file:transition-all duration-300 text-text-muted text-sm border-dashed"
                  {...register("image")}
                />

              <Button
                type="submit"
                variant="filled"
                disabled={isUpdating}
                className={`w-full py-3 mt-2 font-semibold tracking-widest text-base transition-all duration-300 flex items-center justify-center gap-2.5 ${
                  isUpdating 
                    ? "cursor-not-allowed opacity-60" 
                    : "hover:shadow-[0_0_18px_rgba(52,211,153,0.35)] active:scale-[0.98]"
                }`}
              >
                {isUpdating ? (
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
                    UPDATING...
                  </div>
                ) : (
                  "UPDATE PROFILE"
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
