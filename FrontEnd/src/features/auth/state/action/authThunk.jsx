import { createAsyncThunk } from "@reduxjs/toolkit";
import {axiosInstance} from "..//../../../app/config/axiosInstance";

// Async thunk for login
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async (credentials, thunkAPI) => {    
     try {
        const response = await axiosInstance.post('/auth/login', credentials);
        console.log('Login Response:', response.data);
        return response.data.data;
     } catch (error) {
        console.error('Login failed:', error);
        return thunkAPI.rejectWithValue({message : 'Login failed'});
     }
})

// Async thunk for registration
export const registerUser = createAsyncThunk(
    'auth/registerUser',
    async (userData, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/auth/register', userData);
           
            return response.data.data;
        } catch (error) {
            console.error('Registration failed:', error);
            return thunkAPI.rejectWithValue({message : 'Registration failed'});
        }
    }
);


// Async thunk for refreshing token
export const refreshToken = createAsyncThunk(
    'auth/refreshToken',
    async (_, thunkAPI) => {
        try {
            const response = await axiosInstance.post('/auth/refresh');
            return response.data.accessToken;
        } catch (error) {
            console.error('Token refresh failed:', error);
            return thunkAPI.rejectWithValue({message : 'Token refresh failed'});
        }
    }
);
