import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux';
import {axiosInstance} from '../app/config/axiosInstance'
import { setUser } from '../features/auth/state/authSlice';
const InitialData = () => {
    const dispatch = useDispatch();
    useEffect(() => {
        (async () => {
            const response = await axiosInstance.get('/users/me');
            dispatch(setUser(response.data.data));
        })()
    }, [])
  return (
    <div>
      
    </div>
  )
}

export default InitialData
