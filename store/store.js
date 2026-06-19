import { configureStore } from "@reduxjs/toolkit";
import authReducer from './AuthSclice';

export const store=configureStore({
    reducer:{
        auth:authReducer,
    }
})