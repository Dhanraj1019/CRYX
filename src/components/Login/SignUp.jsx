import { useForm } from 'react-hook-form'
import Input from '../Input'
import Button from '../Button/Button'
import AuthObj from '../../../Supabase/auth';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import Loader from '../Loader';
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
        console.log("data in signup.jsx file = ",data);
        const data2={...data,imageurl:tempPath,publicurl:tempPublicUrl};
        const result=await AuthObj.saveProfile({data:data2});
        console.log("result in signup.jsx = ",result);
        setLoader(false);
        navigate("/home");
    }
  }

  return !loader && (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-3 sm:px-4 py-4 animate-fade-in">
      <div className="w-full max-w-md">
        {/* Signup Card */}
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
              secure_signup.sh
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
            <form onSubmit={handleSubmit(signUp)} className="space-y-5">
              <Input
                label="Email"
                placeholder="agent@cryx"
                {...register("email", { required: true })}
              />

                <Input
                    label="UserName"
                    placeholder="enter password..."
                    {...register("username",{required:true})}
                />
              <Input
                label="Password"
                type="password"
                placeholder="••••••••"
                {...register("password", { required: true })}
              />
              {/* <Input
                label="PhoneNumber"
                type="text"
                placeholder="1234567890"
                {...register("phone")}
              /> */}
              <Input label="phone" placeholder="1234567890"  {...register("phone",{ 
                    // required: "Phone number is required",
                    pattern: {
                      value: /^[0-9]+$/, // Regex that only allows numbers 0-9
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
                  })}/>
                  {errors.phone && (
                    <p className="text-neon-red text-xs mt-1 font-mono tracking-wider" role="alert">{errors.phone.message}</p>
                  )}

              <Input
                label="InstagramId"
                type="text"
                placeholder="user_23"
                {...register("instagramid")}
              />
              <Input
                label="LinkdinId"
                type="text"
                placeholder="user_23"
                {...register("linkdinid")}
              />

              <Button
                type="submit"
                variant="filled"
                className="w-full py-3 mt-2 font-semibold tracking-widest text-base"
              >
                SIGN_UP
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
