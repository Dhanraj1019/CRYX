import { useState,useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import Loader from "../Loader";

export default function UserProtext({children,authentication=true}){
    const [loader,setLoader]=useState(true);
    const navigate=useNavigate();
    const authStatus=useSelector((state)=>state.auth.status);
    useEffect(()=>{
        if(authentication && !authStatus){
            navigate("/login");
        }
        else if(!authentication && authStatus){
            navigate("/home")
        }
        setLoader(false);
    },[authStatus,navigate,authentication]);
    return loader ? <Loader/> : <>{children}</>
}