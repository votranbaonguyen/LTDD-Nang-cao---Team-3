import { configureStore } from '@reduxjs/toolkit'
import authenticationSlice from './authentication/authenticationSlice'

export const store = configureStore({
  reducer: {
    authenticationSlice
  },
})