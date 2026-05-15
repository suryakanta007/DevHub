// import {configureStore} from '@reduxjs/toolkit'
// import authReducer from '../../features/auth/state/authSlice';
// import { injectStore } from "../config/axiosInstance";
// export const store = configureStore({
//     reducer: {
//         auth: authReducer
//     }
// })

// injectStore(store);

import { configureStore } from "@reduxjs/toolkit";
import authReducer from "../../features/auth/state/authSlice";

import { injectStore } from "../config/axiosInstance";

export const store = configureStore({
  reducer: {
    auth: authReducer,
  },
});


// inject AFTER store created
injectStore(store);