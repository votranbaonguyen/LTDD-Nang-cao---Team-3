import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import { getUserInfo } from '../../util/storage/userStorage';
import { documentAPI } from './api';

const initialState = {
    loading: false,
    classInfo: null,
    todayClassList: [],
    allClassList: []
};

export const uploadDocument = createAsyncThunk('document/uploadDocument', async (fileData) =>{
    try {
        const userInfo = await getUserInfo();
        let res = await axios.post(documentAPI.uploadDocument, fileData ,{
            headers: {
                'Content-Type': 'multipart/form-data',
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error);
        return error.response.data;
    }
})

export const documentSlice = createSlice({
    name: 'document',
    initialState,
    extraReducers: (builder) => {
    
    },
});

// Action creators are generated for each case reducer function
export const {} = documentSlice.actions;

export default documentSlice.reducer;
