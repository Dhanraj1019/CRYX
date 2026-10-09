import { configureStore } from "@reduxjs/toolkit";
import authReducer from './AuthSclice';
import notificationReducer from './Notifucation'
export const store=configureStore({
    reducer:{
        auth:authReducer,
        notification:notificationReducer,
    }
})