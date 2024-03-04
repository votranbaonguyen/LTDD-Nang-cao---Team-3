import { configureStore } from '@reduxjs/toolkit'
import authenticationSlice from './authentication/authenticationSlice'
import classSlice from './class/classSlice'

export const store = configureStore({
  reducer: {
    authenticationSlice,
    classSlice
  },
})