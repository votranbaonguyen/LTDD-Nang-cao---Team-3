import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authenticationAPI, classAPI } from './api';
import axios from 'axios';
import { getUserInfo } from '../../util/realm/userRealm';

const initialState = {
    loading: false,
    classInfo: null
}

export const getClassInfo = createAsyncThunk(
    "authentication/getClassInfo",
    async (classId) => {
      try {
        const userInfo = getUserInfo()
        let res = await axios.get(classAPI.getOne(classId), {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${userInfo.token}`,
          },
        });
        return res.data;
      } catch (error) {
        console.log(error)
        return error.response.data;
      }
    }
  );

  export const classSlice = createSlice({
    name: 'class',
    initialState,
    extraReducers: (builder) => {
        builder.addCase(getClassInfo.pending, (state, action) => {
            state.loading = true
          })
    
          builder.addCase(getClassInfo.fulfilled, (state, action) => {
            state.loading = false
            state.classInfo = action.payload.data
        
          })
    
          builder.addCase(getClassInfo.rejected, (state, action) => {
            state.loading = false
          })
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { } = classSlice.actions
  
  export default classSlice.reducer