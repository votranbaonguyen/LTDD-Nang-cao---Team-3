import { configureStore } from '@reduxjs/toolkit';
import authenticationSlice from './authentication/authenticationSlice';
import classSlice from './class/classSlice';
import userSlice from './user/userSlice';
import documentSlice from './document/documentSlice';
import assignmentSlice from './assignment/assignmentSlice';
import checkoutSlice from './checkout/checkoutSlice';

export const store = configureStore({
    reducer: {
        authenticationSlice,
        classSlice,
        userSlice,
        documentSlice,
        assignmentSlice,
        checkoutSlice,
    },
});
