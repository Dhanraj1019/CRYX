import { useForm } from "react-hook-form"
import Input from "../Input";
import Button from "../Button/Button";
import { useState } from "react";
import supabase from "../../../Supabase/Supabase";
import { useNavigate } from "react-router-dom";
import DatabaseObj from "../../../Supabase/database";
import Loader from '../Loader'
import { useSelector, useDispatch } from "react-redux";
import { setNotification } from "../../../store/Notifucation";
export default function AddMember(){
    const navigate=useNavigate();
    const dispatch=useDispatch();
    const [searchLoader,setSearchLoader]=useState(false);
    const [searchData,setSearchData]=useState(null);
    const [searched,setSearched] = useState(false);
    const { handleSubmit, register ,getValues,reset } = useForm();
    const [loader,setLoader] = useState(false);
    const userid=useSelector((state)=>state.auth.user.id);
    const publicUrl="https://plvpgzkvaakmjdwesjjs.supabase.co/storage/v1/object/public/userimage/Fix_Images/hacker.jpg";

    const add = async(data)=>{
        if(!searchData){
            dispatch(setNotification({type:"error",message:"Please search and select a username first",title:"Add Member"}));
            return;
        }
        setLoader(true);
        try{
          if(searchData.role==="user" && data.role!=="user"){
            const result=await DatabaseObj.updateData({table:"userprofile",data:{"role":data.role},id:searchData.id});
            const updated=await DatabaseObj.getRow({bucket:"userprofile",chake:["id",searchData.id]});
            const fnfupdated={...updated,publicurl:publicUrl};
            const fnf=await DatabaseObj.insertData({table:"memberprofile",data:fnfupdated});
            dispatch(setNotification({type:"success",message:`Agent "${searchData.username}" enrolled as ${data.role} successfully`,title:"Add Member"}));
          }
          else if(searchData.role!=="user" && searchData.role!==data.role){
            const result=await DatabaseObj.updateData({table:"userprofile",data:{"role":data.role},id:searchData.id});
            const updated=await DatabaseObj.getRow({bucket:"userprofile",chake:["id",searchData.id]});
            const member_id=await DatabaseObj.getRow({bucket:"memberprofile",chake:["username",searchData.username]})
            if(data.role==="user"){
              const deleteMember=await DatabaseObj.deleteRow({bucket:"memberprofile",id:member_id.id});
              dispatch(setNotification({type:"success",message:`Agent "${searchData.username}" demoted to user and removed from member list`,title:"Add Member"}));
            }
            else{
              const memUpdate=await DatabaseObj.updateData({table:"memberprofile",data:{"role":data.role},id:member_id.id});
              dispatch(setNotification({type:"success",message:`Agent "${searchData.username}" role updated to ${data.role}`,title:"Add Member"}));
            }
          } else {
            dispatch(setNotification({type:"error",message:"No role change detected. Select a different role.",title:"Add Member"}));
          }
        } catch(err){
          console.log("error in add member = ",err);
          dispatch(setNotification({type:"error",message:"An error occurred while updating member role",title:"Add Member"}));
        }
        reset()
        setLoader(false);
        setSearched(false);
        // navigate("/add-member");
    }

    const togalSearchResult=async()=>{
        setSearched(true)
        setSearchLoader(true);
        const value=getValues("username");
        if(!value.trim()) {
            setLoader(false);
            return;
        }
        const {data,error} = await supabase.from("userprofile").select("*").eq("username",value).single();
        // console.log("data ",data)
        // console.log("error ",error)
        if(error){
            setSearchData(null);
        }else{

            setSearchData(data);
        }
        setSearchLoader(false);
        
    }

    return !loader && (
        <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-3 sm:px-4 py-6 animate-fade-in">
      <div className="w-full max-w-md">
        {/* Add Member Card */}
        <div className="relative border border-border-subtle bg-[#0b0f19]/80 backdrop-blur-xl rounded-md overflow-hidden transition-all duration-500 hover:border-neon-green/30 group shadow-[0_0_40px_rgba(52,211,153,0.04)] hover:shadow-[0_0_50px_rgba(52,211,153,0.08)]">
          {/* Top Scanline Glow */}
          <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-neon-green to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-bg-elevated/40 border-b border-border-subtle/50">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-70 hover:opacity-100 hover:shadow-[0_0_6px_#ff5f56] transition-all duration-300"></span>
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-70 hover:opacity-100 hover:shadow-[0_0_6px_#ffbd2e] transition-all duration-300"></span>
              <span className="w-3 h-3 rounded-full bg-neon-green opacity-70 hover:opacity-100 hover:shadow-[0_0_6px_#34d399] transition-all duration-300"></span>
            </div>
            <span className="text-text-muted font-mono text-xs tracking-widest flex items-center gap-1.5 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-ping"></span>
              add_member.sh //
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
              AGENT ENROLLMENT
            </h1>
            <p className="text-center text-text-muted font-mono text-xs tracking-wider mb-8">
              // Enroll and set clearance levels for cyber agents
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(add)} className="space-y-5">
                 <div className="flex flex-col gap-1.5">
                    <label
                        htmlFor="userid"
                        className="text-xs font-semibold tracking-widest uppercase text-neon-green"
                    >
                        Username
                    </label>

                    <div className="flex gap-2.5 items-stretch">
                        <input
                            id="userid"
                            type="text"
                            placeholder="e.g. agent_123"
                            className="flex-1 h-11 bg-[#0d1117]/80 border border-[#1e2d3d] rounded-sm
                                    px-3.5 text-sm text-text-primary font-mono outline-none
                                    focus:border-neon-green focus:ring-1 focus:ring-neon-green
                                    transition-all duration-300 focus:shadow-[0_0_10px_#00ff8833]"
                            {...register("username", { required: true })}
                        />

                        <button
                            type="button"
                            className="shrink-0 h-11 px-5 bg-neon-green/5 border border-neon-green/30
                                    rounded-sm text-neon-green text-xs font-semibold tracking-widest
                                    uppercase cursor-pointer transition-all duration-300
                                    hover:bg-neon-green/15 hover:border-neon-green/80 hover:shadow-[0_0_10px_rgba(52,211,153,0.25)] active:scale-95"
                            onClick={togalSearchResult}
                        >
                            Search
                        </button>
                    </div>
                </div>
                {
                    searched && <div className="flex w-full">
                        {
                            loader && (
                              <div className="flex w-full items-center justify-center p-3 border border-border-subtle bg-bg-surface/50 rounded-sm">
                                <p className="text-text-muted font-mono text-xs animate-pulse">
                                  [i] QUERYING TELEMETRY REGISTRY...
                                </p>
                              </div>
                            ) || searchData && 
                             (
                                <div onClick={()=>setSearched(false)} className="flex flex-col w-full border border-neon-green/30 bg-neon-green/5 hover:border-neon-green/70 hover:bg-neon-green/10 rounded-sm cursor-pointer p-4 gap-2 transition-all duration-300 group shadow-[0_0_15px_rgba(52,211,153,0.02)]">
                                    <div className="flex items-center justify-between">
                                        <span className="text-neon-green font-mono text-xs font-bold tracking-wider uppercase">
                                            [+] TARGET PROFILE FOUND
                                        </span>
                                        <span className="text-text-muted font-mono text-[10px] group-hover:text-neon-green/60 transition-colors">
                                            Click to close ×
                                        </span>
                                    </div>
                                    <div className="h-px bg-neon-green/20 w-full"></div>
                                    <div className="grid grid-cols-2 gap-2 font-mono text-xs mt-1">
                                        <div className="text-text-muted">AGENT USERNAME:</div>
                                        <div className="text-text-primary text-right font-semibold">{searchData.username}</div>
                                        <div className="text-text-muted">CLEARANCE ROLE:</div>
                                        <div className="text-neon-cyan text-right uppercase tracking-wider font-bold">{searchData.role}</div>
                                    </div>
                                </div>
                            ) || (
                              <div className="flex w-full items-center justify-center border border-neon-red/30 bg-neon-red/5 p-3 rounded-sm font-mono text-xs text-neon-red shadow-[0_0_10px_rgba(248,113,113,0.05)] select-none">
                                <span className="font-bold">[!] ERROR: TARGET AGENT NOT FOUND</span>
                              </div>
                            )
                        }
                    </div>

                }

              <div className="flex flex-col gap-1.5">
                <label className="text-xs font-semibold tracking-widest uppercase text-neon-green">
                  Clearance Role
                </label>
                <select 
                  className="w-full cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%2334d399%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22M6%208l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-position[right_0.75rem_center] bg-size[1.25rem_1.25rem] bg-no-repeat pr-10 rounded-sm border border-[#1e2d3d] bg-[#0d1117] px-4 py-3 font-mono text-text-primary outline-none transition-all duration-300 focus:border-neon-green focus:ring-1 focus:ring-neon-green focus:shadow-[0_0_10px_#00ff8833]" 
                  {...register("role",{required:true})}
                >
                  <option value="user" className="bg-bg-primary text-text-primary">user</option>
                  <option value="exicutive" className="bg-bg-primary text-text-primary">executive</option>
                  <option value="member" className="bg-bg-primary text-text-primary">member</option>
                </select>
              </div>

              <Button
                type="submit"
                variant="filled"
                className={`w-full py-3 mt-2 font-semibold tracking-widest text-base transition-all duration-300 active:scale-[0.98] ${searchData?.id===userid ? "cursor-not-allowed opacity-50 bg-[#ff5f56]/10 border-[#ff5f56]/30 text-[#ff5f56] hover:shadow-none" : "hover:shadow-[0_0_18px_rgba(52,211,153,0.35)]" }`}
                disabled={searchData ? searchData.id===userid : false}
              >
                {searchData?.id===userid?"ACTION PROHIBITED":"ENROLL MEMBER"}
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