import { configureStore } from '@reduxjs/toolkit'
import authenticationSlice from './authentication/authenticationSlice'
import classSlice from './class/classSlice'
import userSlice from './user/userSlice'

export const store = configureStore({
  reducer: {
    authenticationSlice,
    classSlice,
    userSlice
  },
})