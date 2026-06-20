import { useForm } from 'react-hook-form'
import Input from '../Input'
import Button from '../Button/Button'
import AuthObj from '../../../Supabase/auth';
import { useDispatch } from 'react-redux';
import {login as statelogin} from '../../../store/AuthSclice'
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loader from '../Loader';
export default function Login() {
  const { handleSubmit, register } = useForm();
  const dispatch=useDispatch();
  const navigate=useNavigate();
  const [loader,setLoader]=useState(false);
  const login = async (data) => {
    if(data){
      setLoader(true);
      console.log("data in login.jsx = ",data);
      const result=await AuthObj.signIn({email:data.email,password:data.password});
      console.log("result after login = ",result);
      if(result){
        setLoader(false);
        navigate("/home");
      }
      console.log("result in login.jsx = ",result);
    }
  }

  return !loader && (
    <div className="flex items-center justify-center min-h-[calc(100vh-160px)] px-4 animate-fade-in">
      <div className="w-full max-w-md">
        {/* Login Card */}
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
              secure_login.sh
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
              // Enter credentials to proceed
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(login)} className="space-y-5">
              <Input
                label="Username"
                placeholder="agent@cryx"
                {...register("email", { required: true })}
              />

              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                {...register("password", { required: true })}
              />

              <Button
                type="submit"
                variant="filled"
                className="w-full py-3 mt-2 font-semibold tracking-widest text-base"
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
