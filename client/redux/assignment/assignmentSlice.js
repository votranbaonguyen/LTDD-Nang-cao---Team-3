import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserInfo } from '../../util/storage/userStorage';
import { assignmentAPI } from './api';


const initialState = {
    loading: false,
};

export const updateOneAssignment = createAsyncThunk('assignment/updateOneAssignment', async ({assignmentId,data}) => {
    try {
        const userInfo = await getUserInfo();
        let res = await axios.patch(assignmentAPI.updateOne(assignmentId), data, {
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

export const createAssignment = createAsyncThunk('assignment/createAssignment', async (data) => {
    try {
        const userInfo = await getUserInfo();
        let res = await axios.post(assignmentAPI.createOne, data, {
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

export const assignmentSlice = createSlice({
    name: 'assignment',
    initialState,
    extraReducers: (builder) => {
    
    },
});

// Action creators are generated for each case reducer function
export const {} = assignmentSlice.actions;

export default assignmentSlice.reducer;