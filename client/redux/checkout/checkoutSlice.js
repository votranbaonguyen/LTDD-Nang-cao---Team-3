import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import { checkoutAPI } from './api';
import axios from 'axios';
import { getUserInfo } from '../../util/storage/userStorage';

const initialState = {
    loading: false,
    checkoutInfo: {},
};

export const createCheckout = createAsyncThunk('checkout/create', async (data) => {
    try {
        const userInfo = await getUserInfo();

        let res = await axios.post(checkoutAPI.create, data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error.response.data);
        return error.response.data;
    }
});

export const getCheckoutByClass = createAsyncThunk('checkout/getcurrent', async (classId) => {
    try {
        const userInfo = await getUserInfo();

        let res = await axios.get(checkoutAPI.getCurrent(classId), {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error.response.data);
        return error.response.data;
    }
});

export const updateCheckout = createAsyncThunk('checkout/update', async ({ checkoutId, data }) => {
    try {
        const userInfo = await getUserInfo();

        let res = await axios.patch(checkoutAPI.update(checkoutId), data, {
            headers: {
                'Content-Type': 'application/json',
                Authorization: `Bearer ${userInfo.token}`,
            },
        });
        return res.data;
    } catch (error) {
        console.log(error.response.data);
        return error.response.data;
    }
});

export const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    reducers: {},
    extraReducers: (builder) => {
        builder.addCase(createCheckout.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(createCheckout.fulfilled, (state, action) => {
            state.loading = false;
            state.checkoutInfo = action.payload.data;
        });

        builder.addCase(createCheckout.rejected, (state, action) => {
            state.loading = false;
        });
        //get checkout
        builder.addCase(getCheckoutByClass.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(getCheckoutByClass.fulfilled, (state, action) => {
            state.loading = false;
            state.checkoutInfo = action.payload.total > 0 ? action.payload.data[0] : {};
        });

        builder.addCase(getCheckoutByClass.rejected, (state, action) => {
            state.loading = false;
        });
        //update
        builder.addCase(updateCheckout.pending, (state, action) => {
            state.loading = true;
        });

        builder.addCase(updateCheckout.fulfilled, (state, action) => {
            state.loading = false;
            state.checkoutInfo = action.payload.data;
        });

        builder.addCase(updateCheckout.rejected, (state, action) => {
            state.loading = false;
        });
    },
});

// Action creators are generated for each case reducer function
export const {} = checkoutSlice.actions;

export default checkoutSlice.reducer;
