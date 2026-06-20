import { useForm } from "react-hook-form"
import Input from "../Input";
import Button from "../Button/Button";
import { useState } from "react";
import supabase from "../../../Supabase/Supabase";
import { useNavigate } from "react-router-dom";
import DatabaseObj from "../../../Supabase/database";
import Loader from '../Loader'
export default function AddMember(){
    const navigate=useNavigate();
    const [searchLoader,setSearchLoader]=useState(false);
    const [searchData,setSearchData]=useState(null);
    const [searched,setSearched] = useState(false);
    const { handleSubmit, register ,getValues,reset } = useForm();
    const [loader,setLoader] = useState(false);
    const add = async(data)=>{
        if(!searchData){
            alert("search username first");
            return;
        }
        setLoader(true);
        const publicUrl="https://plvpgzkvaakmjdwesjjs.supabase.co/storage/v1/object/public/userimage/avtarlogo.jpg";
        // console.log("role in data after add click ",data);
        // console.log("searchdata ",searchData);
        const result=await supabase.from("userprofile").update({"role":data.role}).eq("id",searchData.id)
        const updated=(await supabase.from("userprofile").select("*").eq("id",searchData.id)).data[0];
        const fnfupdated={...updated,imageurl:"avtarlogo.jpg",publicurl:publicUrl};
        const fnf=await DatabaseObj.insertData({table:"memberprofile",data:fnfupdated});
        // console.log("updated data = ",fnfupdated);
        // console.log(fnf);
        reset()
        setLoader(false);
        setSearched(false);
        navigate("/add-member");
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
        <div className="flex items-center justify-center min-h-[calc(100vh-160px)] px-4 animate-fade-in">
      <div className="w-full max-w-md">
        {/* Add Member Card */}
        <div className="border border-border-subtle bg-bg-surface/60 backdrop-blur-md rounded-sm overflow-hidden"
          style={{
            boxShadow: "0 0 30px rgba(0,255,136,0.08), 0 0 60px rgba(0,255,136,0.03)",
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
              add_member.sh
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
              // Enter credentials to add member
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
                            placeholder="agent_123"
                            className="flex-1 h-11 bg-black border border-neon-green/25 rounded-md
                                    px-3.5 text-sm text-gray-200 font-mono outline-none
                                    focus:border-neon-green focus:ring-1 focus:ring-neon-green
                                    transition-colors"
                            {...register("username", { required: true })}
                        />

                        <button
                            type="button"
                            className="shrink-0 h-11 px-5 bg-transparent border-[1.5px] border-neon-green
                                    rounded-md text-neon-green text-xs font-semibold tracking-widest
                                    uppercase cursor-pointer transition-colors
                                    hover:bg-neon-green hover:text-black"
                            onClick={togalSearchResult}
                        >
                            Search
                        </button>
                    </div>
                </div>
                {
                    searched && <div className="flex">
                        {
                            loader && <p>Loading...</p> || searchData && 
                             (
                                <div onClick={()=>setSearched(false)} className="flex flex-col w-full justify-center items-center border border-neon-green rounded-md cursor-pointer p-2">
                                    <p className="text-neon-green font-mono">
                                        Username: {searchData.username}
                                    </p>

                                    <p className="text-gray-300 text-sm">
                                        Role: {searchData.role}
                                    </p>
                                </div>
                            ) || <p>something went wrong</p>
                        }
                    </div>

                }

              <select className="w-full cursor-pointer text-neon-green bg-black p-2 border-2 rounded-bl-lg rounded-tr-lg hover:shadow-md" {...register("role",{required:true})}>
                <option value="user" name="user">user</option>
                <option value="admin" name="user">admin</option>
                <option value="exicutive" name="user">exicutive</option>
              </select>

              <Button
                type="submit"
                variant="filled"
                className="w-full py-3 mt-2 font-semibold tracking-widest text-base"
              >
                ADD
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