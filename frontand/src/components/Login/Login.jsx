import { useForm } from 'react-hook-form'
import Input from '../Input'
import Button from '../Button/Button'
import AuthObj from '../../../Supabase/auth';
import { useDispatch } from 'react-redux';
import {login as statelogin} from '../../../store/AuthSclice'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loader from '../Loader';
import { setNotification } from '../../../store/Notifucation';
export default function Login() {
  const { handleSubmit, register } = useForm();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [loader,setLoader]=useState(false);
  const login = async (data) => {
    if(data){
      setLoader(true);
      // console.log("data in login.jsx = ",data);
      const result=await AuthObj.signIn({email:data.email,password:data.password});
      // console.log("result after login = ",result);
      if(result){
        dispatch(setNotification({title:"Login",message:"login succesfuly",type:"success"}));
        setLoader(false);
        navigate("/home");
      }
      else{
        dispatch(setNotification({title:"Login",message:"login not correct",type:"error"}));
        setLoader(false);
        navigate("/login")
      }
      // console.log("result in login.jsx = ",result);
    }
  }

  const handelGoogle=async()=>{
    try{
      const res=await AuthObj.googleAuth();
      console.log(res);

    }catch(e){
      console.log("error in google :",e);
    }
  }

  return !loader && (
    <div className="bg-transparent flex items-center justify-center min-h-[calc(100vh-120px)] px-3 sm:px-4 py-6 animate-fade-in">
      <div className="bg-transparent w-full max-w-md">
        {/* Login Card */}
        <div className="relative border border-border-subtle bg-transparent backdrop-grayscale  rounded-md overflow-hidden transition-all duration-500 hover:border-neon-green/30 group shadow-[0_0_40px_rgba(52,211,153,0.04)] hover:shadow-[0_0_50px_rgba(52,211,153,0.08)]">
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
              secure_login.sh //
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
              ACCESS TERMINAL
            </h1>
            <p className="text-center text-text-muted font-mono text-xs tracking-wider mb-8">
              // Enter credentials to proceed
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(login)} className="space-y-5">
              <Input
                label=" Email"
                placeholder="agent@cryx"
                {...register("email", { required: true })}
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                {...register("password", { required: true })}
              />
              <div
                  onClick={handelGoogle}
                  variant="filled"
                  className="group cursor-pointer flex items-center justify-center gap-3 w-full h-12 mt-2
                   bg-[#0b1016]/80 border border-[#24333a]
                   text-[#39d89a] font-semibold tracking-widest text-sm
                   rounded-[3px]
                   transition-all duration-300 ease-out
                   hover:border-neon-green
                   hover:bg-[#0d1918]
                   hover:shadow-[0_0_12px_rgba(52,211,153,0.18)]
                   active:scale-[0.98]"
                >
                  <div>
                    <svg className='h-10 w-10' xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" width="100" height="100" viewBox="0 0 48 48">
                          <path fill="#FFC107" d="M43.611,20.083H42V20H24v8h11.303c-1.649,4.657-6.08,8-11.303,8c-6.627,0-12-5.373-12-12c0-6.627,5.373-12,12-12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C12.955,4,4,12.955,4,24c0,11.045,8.955,20,20,20c11.045,0,20-8.955,20-20C44,22.659,43.862,21.35,43.611,20.083z"></path><path fill="#FF3D00" d="M6.306,14.691l6.571,4.819C14.655,15.108,18.961,12,24,12c3.059,0,5.842,1.154,7.961,3.039l5.657-5.657C34.046,6.053,29.268,4,24,4C16.318,4,9.656,8.337,6.306,14.691z"></path><path fill="#4CAF50" d="M24,44c5.166,0,9.86-1.977,13.409-5.192l-6.19-5.238C29.211,35.091,26.715,36,24,36c-5.202,0-9.619-3.317-11.283-7.946l-6.522,5.025C9.505,39.556,16.227,44,24,44z"></path><path fill="#1976D2" d="M43.611,20.083H42V20H24v8h11.303c-0.792,2.237-2.231,4.166-4.087,5.571c0.001-0.001,0.002-0.001,0.003-0.002l6.19,5.238C36.971,39.205,44,34,44,24C44,22.659,43.862,21.35,43.611,20.083z"></path>
                    </svg>
                  </div>
                  <div>
                    Continue with google
                  </div>
              </div>

              <Button
                type="submit"
                variant="filled"
                className="w-full py-3 mt-2 font-semibold tracking-widest text-base transition-all duration-300 hover:shadow-[0_0_18px_rgba(52,211,153,0.35)] active:scale-[0.98]"
              >
                AUTHENTICATE
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
