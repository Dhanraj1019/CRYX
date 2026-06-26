import { useForm } from 'react-hook-form'
import Input from '../Input'
import Button from '../Button/Button'
import AuthObj from '../../../Supabase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loader from '../Loader';
import { setNotification } from '../../../store/Notifucation';
export default function SignUp() {
  const { handleSubmit, register,formState: { errors } } = useForm();
    const diapatch=useDispatch();
    const navigate=useNavigate();
    const tempPublicUrl="";
    const tempPath="";
  const [loader,setLoader] = useState(false);
  const signUp = async (data) => {
    if(data){
      setLoader(true);
        // console.log("data in signup.jsx file = ",data);
        const data2={...data,imageurl:tempPath,publicurl:tempPublicUrl};
        const result=await AuthObj.saveProfile({data:data2});
        // console.log("result in signup.jsx = ",result);
        setLoader(false);
        if(result){
          diapatch(setNotification({message:"signup successful",type:"success",title:"signup"}))
          navigate("/home");
        }
        else{
          diapatch(setNotification({message:"error during signup",type:"error",title:"signup"}))
          navigate("/signup")
        }
    }
  }
 
  return !loader && (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-3 sm:px-4 py-6 animate-fade-in">
      <div className="w-full max-w-xl">
        {/* Signup Card */}
        <div className="relative border border-border-subtle bg-[#0b0f19]/80 backdrop-blur-xl rounded-md overflow-hidden transition-all duration-500 hover:border-neon-green/30 group shadow-[0_0_40px_rgba(52,211,153,0.04)] hover:shadow-[0_0_50px_rgba(52,211,153,0.08)]">
          {/* Top Scanline Glow */}
          <div className="absolute top-0 left-0 right-0 h-0.5 bg-liner-to-r from-transparent via-neon-green to-transparent opacity-60 group-hover:opacity-100 transition-opacity duration-500"></div>

          {/* Header Bar */}
          <div className="flex items-center justify-between px-5 py-3.5 bg-bg-elevated/40 border-b border-border-subtle/50">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-[#ff5f56] opacity-70 hover:opacity-100 hover:shadow-[0_0_6px_#ff5f56] transition-all duration-300"></span>
              <span className="w-3 h-3 rounded-full bg-[#ffbd2e] opacity-70 hover:opacity-100 hover:shadow-[0_0_6px_#ffbd2e] transition-all duration-300"></span>
              <span className="w-3 h-3 rounded-full bg-neon-green opacity-70 hover:opacity-100 hover:shadow-[0_0_6px_#34d399] transition-all duration-300"></span>
            </div>
            <span className="text-text-muted font-mono text-xs tracking-widest flex items-center gap-1.5 select-none">
              <span className="w-1.5 h-1.5 rounded-full bg-neon-green animate-ping"></span>
              secure_signup.sh //
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
              AGENT REGISTRATION
            </h1>
            <p className="text-center text-text-muted font-mono text-xs tracking-wider mb-8">
              // Enter credentials to proceed
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(signUp)} className="space-y-5">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Email"
                  placeholder="agent@cryx"
                  {...register("email", { required: true })}
                />

                <Input
                    label="Username"
                    placeholder="e.g. agent_alpha"
                    {...register("username",{required:true})}
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Password"
                  type="password"
                  placeholder="••••••••"
                  {...register("password", { required: true })}
                />
                <Input 
                  label="Phone Number" 
                  placeholder="e.g. 1234567890"  
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
              </div>

              {errors.phone && (
                <div className="border border-neon-red/30 bg-neon-red/5 px-4 py-2.5 rounded-sm font-mono text-xs text-neon-red shadow-[0_0_10px_rgba(248,113,113,0.05)] mt-1 select-none">
                  [!] ERROR: {errors.phone.message}
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <Input
                  label="Instagram ID"
                  type="text"
                  placeholder="user_23"
                  {...register("instagramid")}
                />
                <Input
                  label="LinkedIn ID"
                  type="text"
                  placeholder="user_23"
                  {...register("linkdinid")}
                />
              </div>

              <Button
                type="submit"
                variant="filled"
                className="w-full py-3 mt-2 font-semibold tracking-widest text-base transition-all duration-300 hover:shadow-[0_0_18px_rgba(52,211,153,0.35)] active:scale-[0.98]"
              >
                SIGN UP
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
