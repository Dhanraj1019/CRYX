import { createSlice } from '@reduxjs/toolkit';

const initialState={
    status:false,
    user:null,
    session:null
}

const authSclice=createSlice({
    name:"auth",
    initialState,
    reducers:{
        login:(state,action)=>{
            state.status=true;
            state.user=action.payload.user;
            state.session=action.payload.session
        },
        logout:(state)=>{
            state.status=false;
            state.user=null,
            state.session=null
        }
    }
})

export const {login,logout} = authSclice.actions;
export default authSclice.reducer;