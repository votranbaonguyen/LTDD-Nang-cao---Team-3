import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

const initialState = {
    loading: false,
    userInfo: null,
};


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserInfoAfterLogin: (state,action) => {
          state.userInfo = action.payload
        }
    },
    extraReducers: (builder) => {
    
    },
});

export const {updateUserInfoAfterLogin} = userSlice.actions;

export default userSlice.reducer;