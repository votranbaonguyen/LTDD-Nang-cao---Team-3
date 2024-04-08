import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { userAPI } from './api';
import { getUserInfo } from '../../util/storage/userStorage';

const initialState = {
    loading: false,
    userInfo: null,
    deviceToken: null
};

export const updateUser = createAsyncThunk('user/updateUser', async ({userId,data}) => {
    try {
        const userInfo = await getUserInfo();
        let res = await axios.patch(userAPI.updateOne(userId), data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
});


export const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {
        updateUserInfoAfterLogin: (state,action) => {
          state.userInfo = action.payload
        },
        updateDeviceToken: (state,action) => {
            state.deviceToken = action.payload
          }
    },
    extraReducers: (builder) => {
    
    },
});


export const {updateUserInfoAfterLogin,updateDeviceToken} = userSlice.actions;

export default userSlice.reducer;