import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { authenticationAPI, classAPI, commentAPI } from './api';
import axios from 'axios';
import { getUserInfo } from '../../util/storage/userStorage';

const initialState = {
    loading: false,
    classInfo: null,
    todayClassList: [],
    allClassList: [],
    uploadDocumentsList: [],
    newAssignmentList: [],
    studentStatisList: [],
    classCommentList: [],
    assignmentStatis: []
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

export const getTodayClassList = createAsyncThunk('class/getTodayClassList', async (userInfo) => {
    try {
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

export const getClassListByDate = createAsyncThunk('class/getClassListByDate', async (data) => {
    const {userInfo,date} = data
    try {
        let url = '';
        if (userInfo.role === 'teacher') {
            url = classAPI.getAllTeacherClassByDate(date.getDay(), userInfo._id);
        } else if (userInfo.role === 'student') {
            url = classAPI.getAllStudentClassByDate(date.getDay(), userInfo._id);
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

export const getAllClassById = createAsyncThunk('class/getAllClassById', async (userInfo) => {
    try {
        let url = '';
        if (userInfo.role === 'teacher') {
            url = classAPI.getAllByTeacherId(userInfo._id);
        } else if (userInfo.role === 'student') {
            url = classAPI.getAllByStudentId(userInfo._id);
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

export const getClassStatis = createAsyncThunk(
    'class/getClassStatis',
    async (classId) => {
        try {
            const userInfo = await getUserInfo();
            let res = await axios.get(classAPI.getClassStatis(classId), {
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

export const getAllClassComment = createAsyncThunk(
    'class/getAllClassComment',
    async (classId) => {
        try {
            const userInfo = await getUserInfo();
            let tempApi = ''
            if(userInfo.role === 'teacher'){
                tempApi = commentAPI.getAllByClass(classId)
            } else tempApi = commentAPI.getAllByStudent(classId, userInfo._id)
            let res = await axios.get(tempApi, {
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

export const sendStudentComment = createAsyncThunk(
    'class/sendStudentComment',
    async (data) => {
        try {
            const userInfo = await getUserInfo();
            let newData = {
                ...data,
                user:userInfo._id,
            }
            let res = await axios.post(commentAPI.sendComment, newData, {
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

export const getAllStudentClassAssignment = createAsyncThunk(
    'class/getAllStudentClassAssignment',
    async () => {
        try {
            const userInfo = await getUserInfo();

            let res = await axios.get(classAPI.getStudentStatis(userInfo._id), {
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

        builder.addCase(getAllClassById.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(getAllClassById.fulfilled, (state, action) => {
            state.loading = false;
            state.allClassList = action.payload.data;
        });

        builder.addCase(getAllClassById.rejected, (state, action) => {
            state.loading = false;
        });

        builder.addCase(getClassStatis.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(getClassStatis.fulfilled, (state, action) => {
            state.loading = false;
            state.studentStatisList = action.payload.studentList
        });

        builder.addCase(getClassStatis.rejected, (state, action) => {
            state.loading = false;
        });

        builder.addCase(getAllClassComment.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(getAllClassComment.fulfilled, (state, action) => {
            state.loading = false;
            state.classCommentList = action.payload.data
        });

        builder.addCase(getAllClassComment.rejected, (state, action) => {
            state.loading = false;
        });

        builder.addCase(sendStudentComment.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(sendStudentComment.fulfilled, (state, action) => {
            state.loading = false;
        });

        builder.addCase(sendStudentComment.rejected, (state, action) => {
            state.loading = false;
        });

        builder.addCase(getAllStudentClassAssignment.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(getAllStudentClassAssignment.fulfilled, (state, action) => {
            state.loading = false;
            state.assignmentStatis = action.payload.data
        });

        builder.addCase(getAllStudentClassAssignment.rejected, (state, action) => {
            state.loading = false;
        });
    },
});

// Action creators are generated for each case reducer function
export const { removeDocumentFile } = classSlice.actions;

export default classSlice.reducer;
