import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { notiAPI, userAPI } from './api';
import { getUserInfo } from '../../util/storage/userStorage';

const initialState = {
    loading: false,
    userInfo: null,
    deviceToken: null,
    notiList: []
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

export const getAllUserNoti = createAsyncThunk('user/getAllUserNoti', async () => {
    try {
        const userInfo = await getUserInfo();
        let res = await axios.get(notiAPI.getAll(userInfo._id), {
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
        builder.addCase(getAllUserNoti.fulfilled, (state, action) => {
            state.notiList = action.payload.data
            
        });
    },
});


export const {updateUserInfoAfterLogin,updateDeviceToken} = userSlice.actions;

export default userSlice.reducer;