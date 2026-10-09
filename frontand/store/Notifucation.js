import { createSlice } from "@reduxjs/toolkit";
const initialState={
    status:false,
    title:"",
    message:"",
    type:"success"
};
const NotificationSlice=createSlice({
    name:"notification",
    initialState,
    reducers:{
        setNotification:(state,action)=>{
            state.status=true;
            state.title=action.payload.title;
            state.message=action.payload.message;
            state.type=action.payload.type;
        },
        removeNotification:(state)=>{
            state.status=false;
            state.title="";
            state.message="";
            state.type="";
        }
    }
})

export const {setNotification,removeNotification}=NotificationSlice.actions;
export default NotificationSlice.reducer