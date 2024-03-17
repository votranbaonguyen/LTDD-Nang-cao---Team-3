import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authenticationAPI, classAPI } from './api';
import axios from 'axios';
import { getUserInfo } from '../../util/storage/userStorage';

const initialState = {
    loading: false,
    classInfo: null,
    todayClassList: [],
    allClassList: [],
    uploadDocumentsList: [],
    newAssignmentList: [],
};

export const getClassInfo = createAsyncThunk('class/getClassInfo', async (classId) => {
    try {
        const userInfo = await getUserInfo();
        let res = await axios.get(classAPI.getOne(classId), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error.response.data.message);
        return error.response.data;
    }
});

export const getTodayClassList = createAsyncThunk('class/getTodayClassList', async () => {
    try {
        const userInfo = await getUserInfo();
        let currentDate = new Date();
        let url = '';
        if (userInfo.role === 'teacher') {
            url = classAPI.getAllTeacherClassByDate(currentDate.getDay(), userInfo._id);
        } else if (userInfo.role === 'student') {
            url = classAPI.getAllStudentClassByDate(currentDate.getDay(), userInfo._id);
        }
        let res = await axios.get(url, {
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

export const getAllClassByTeacherId = createAsyncThunk('class/getAllClassByTeacherId', async () => {
    try {
        const userInfo = await getUserInfo();
        let res = await axios.get(classAPI.getAllByTeacherId(userInfo._id), {
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

export const updateOneSection = createAsyncThunk(
    'class/updateOneSection',
    async ({ classId, data }) => {
        try {
            const userInfo = await getUserInfo();
            let res = await axios.patch(classAPI.updateOneSection(classId), data, {
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
    }
);

export const createOneSection = createAsyncThunk(
    'class/createOneSection',
    async ({ classId, data }) => {
        try {
            const userInfo = await getUserInfo();
            let res = await axios.patch(classAPI.updateOneSection(classId), data, {
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
    }
);

export const classSlice = createSlice({
    name: 'class',
    initialState,
    reducers: {
        removeDocumentFile: (state, action) => {
            const index = state.classInfo.section.findIndex(
                (section) => section._id === action.payload.sectionId
            );
            if (index !== -1) {
                state.classInfo.section[index].documentUrl.splice(action.payload.documentIndex, 1);
            }
        },
    },
    extraReducers: (builder) => {
        builder.addCase(getClassInfo.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(getClassInfo.fulfilled, (state, action) => {
            state.loading = false;
            state.classInfo = action.payload.data;
        });

        builder.addCase(getClassInfo.rejected, (state, action) => {
            state.loading = false;
        });

        builder.addCase(getTodayClassList.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(getTodayClassList.fulfilled, (state, action) => {
            state.loading = false;
            state.todayClassList = action.payload.data;
        });

        builder.addCase(getTodayClassList.rejected, (state, action) => {
            state.loading = false;
        });

        builder.addCase(getAllClassByTeacherId.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(getAllClassByTeacherId.fulfilled, (state, action) => {
            state.loading = false;
            state.allClassList = action.payload.data;
        });

        builder.addCase(getAllClassByTeacherId.rejected, (state, action) => {
            state.loading = false;
        });
    },
});

// Action creators are generated for each case reducer function
export const { removeDocumentFile } = classSlice.actions;

export default classSlice.reducer;
