import { useForm } from "react-hook-form";
import Input from "../Input";
import Button from "../Button/Button";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import Loader from '../Loader';
import DatabaseObj from "../../../Supabase/database";
import { useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setNotification } from "../../../store/Notifucation";
export default function AddLab() {
  
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [loader, setLoader] = useState(false);
  const {state}=useLocation();
  const name=state?.name || "tryhackme";

  const { handleSubmit, register, reset } = useForm();

  const add = async (data) => {
    setLoader(true);
    console.log(data);
    // Process tags (comma separated string -> array of trimmed strings)
    const tags = data.tags
      ? data.tags.split(",").map((t) => t.trim()).filter((t) => t.length > 0)
      : ["Lab"];

    const platformId = data.platform; // e.g. "tryhackme"

    const newLab = {
      title: data.title.trim(),
      description: data.description.trim(),
      difficulty: data.difficulty,
      url: data.url.trim(),
      tags:tags,
      platform:data.platform,
      date: data.date.trim() || "New",
    };
    const result = await DatabaseObj.insertData({table:"WeaklyLabs",data:newLab});
    setLoader(false);
    if(!result){
      dispatch(setNotification({type:"error",message:"Failed to add lab, please try again",title:"Add Lab"}));
    }
    else if(result.error){
      // console.log("error = ",result.error);
      dispatch(setNotification({type:"error",message:"Failed to add lab, please try again",title:"Add Lab"}));
    }
    else {
      console.log("data saved ",result);
      dispatch(setNotification({type:"success",message:"Lab added successfully",title:"Add Lab"}));
      reset();
      navigate("/weeklylabs");
    }
    setLoader(false);
  };

  return !loader ? (
    <div className="flex items-center justify-center min-h-[calc(100vh-120px)] px-3 sm:px-4 py-6 animate-fade-in">
      <div className="w-full max-w-xl">
        {/* Add Lab Card */}
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
              deploy_lab.sh //
            </span>
          </div>

          {/* Form Body */}
          <div className="p-6 md:p-8">
            {/* Terminal Icon */}
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
                    d="M12 9v6m3-3H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>

            {/* Title */}
            <h1 className="text-center font-mono text-xl md:text-2xl font-bold text-neon-green tracking-wider mb-1 text-glow-green">
              DEPLOY TARGET ROOM
            </h1>
            <p className="text-center text-text-muted font-mono text-xs tracking-wider mb-8">
              // Deploy new target machine to weekly labs
            </p>

            {/* Form */}
            <form onSubmit={handleSubmit(add)} className="space-y-5">
              {/* Platform Selector */}
              <div className="flex flex-col">
                <label className="mb-2 font-mono text-sm uppercase tracking-wider text-neon-green">
                  Target Platform
                </label>
                <select
                  required
                  {...register("platform", { required: true })}
                  className=" cursor-pointer w-full appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%2334d399%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22M6%208l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-position-[right_0.75rem_center] bg-size-[1.25rem_1.25rem] bg-no-repeat pr-10 rounded-sm border border-[#1e2d3d] bg-[#0d1117] px-4 py-3 font-mono text-text-primary placeholder-[#4a5568] outline-none transition-all duration-300 focus:border-neon-green focus:ring-1 focus:ring-neon-green focus:shadow-[0_0_10px_#00ff8833]"
                >
                  <option value="tryhackme" className="bg-bg-primary text-text-primary">TryHackMe</option>
                  <option value="hackthebox" className="bg-bg-primary text-text-primary">HackTheBox</option>
                  <option value="picoctf" className="bg-bg-primary text-text-primary">PicoCTF</option>
                </select>
              </div>

              {/* Title Input */}
              <Input
                label="Lab Title"
                placeholder="e.g. Blue"
                {...register("title", { required: true })}
              />

              {/* Description Textarea */}
              <div className="flex flex-col">
                <label className="mb-2 font-mono text-sm uppercase tracking-wider text-neon-green" htmlFor="description">
                  Description
                </label>
                <textarea
                  className="w-full rounded-sm border border-[#1e2d3d] bg-[#0d1117] px-4 py-3 font-mono text-text-primary placeholder-[#4a5568] outline-none transition-all duration-300 focus:border-neon-green focus:ring-1 focus:ring-neon-green focus:shadow-[0_0_10px_#00ff8833] resize-none"
                  id="description"
                  rows="3"
                  placeholder="Exploit description..."
                  {...register("description", { required: true })}
                ></textarea>
              </div>

              {/* Grid: Difficulty and Date/Week */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex flex-col">
                  <label className="mb-2 font-mono text-sm uppercase tracking-wider text-neon-green">
                    Difficulty
                  </label>
                  <select
                    {...register("difficulty",{required:true})}
                    className="w-full cursor-pointer appearance-none bg-[url('data:image/svg+xml,%3Csvg%20xmlns%3D%22http%3A%2F%2Fwww.w3.org%2F2000%2Fsvg%22%20fill%3D%22none%22%20viewBox%3D%220%200%2020%2020%22%3E%3Cpath%20stroke%3D%22%2334d399%22%20stroke-linecap%3D%22round%22%20stroke-linejoin%3D%22round%22%20stroke-width%3D%221.5%22%20d%3D%22M6%208l4%204%204-4%22%2F%3E%3C%2Fsvg%3E')] bg-position-[right_0.75rem_center] bg-size-[1.25rem_1.25rem] bg-no-repeat pr-10 rounded-sm border border-[#1e2d3d] bg-[#0d1117] px-4 py-3 font-mono text-text-primary placeholder-[#4a5568] outline-none transition-all duration-300 focus:border-neon-green focus:ring-1 focus:ring-neon-green focus:shadow-[0_0_10px_#00ff8833]"
                  >
                    <option value="Easy" className="bg-bg-primary text-text-primary">Easy</option>
                    <option value="Medium" className="bg-bg-primary text-text-primary">Medium</option>
                    <option value="Hard" className="bg-bg-primary text-text-primary">Hard</option>
                  </select>
                </div>
                <Input
                  label="Release Date"
                  placeholder="e.g. Week 11"
                  type="date"
                  {...register("date",{required:true})}
                />
              </div>

              {/* Lab URL */}
              <Input
                label="Lab Target URL"
                type="url"
                placeholder="https://..."
                {...register("url", { required: true })}
              />

              {/* Tags */}
              <Input
                label="Tags (comma-separated)"
                placeholder="Windows, SMB, EternalBlue"
                {...register("tags")}
              />

              {/* Submit Button */}
              <Button
                type="submit"
                variant="filled"
                className="w-full py-3 mt-2 font-semibold tracking-widest text-base transition-all duration-300 hover:shadow-[0_0_18px_rgba(52,211,153,0.35)] active:scale-[0.98]"
              >
                DEPLOY LAB
              </Button>
            </form>

            {/* Bottom text */}
            <div className="mt-6 text-center">
              <p className="text-text-dim font-mono text-xs tracking-wider">
                <span className="text-neon-green/50">›</span> Registered securely in local database
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  ) : (
    <div className="flex justify-center items-center min-h-lvh">
      <Loader />
    </div>
  );
}
