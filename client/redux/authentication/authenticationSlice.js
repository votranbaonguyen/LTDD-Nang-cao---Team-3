import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import { authenticationAPI } from './api';
import axios from 'axios';

const initialState = {
    loading: false,
    changePasswordData: {
      email: '',
      userId: ''
    }
}
export const register = createAsyncThunk(
    "authentication/register",
    async (registerData) => {
      try {

        let res = await axios.post(authenticationAPI.register, registerData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        return res.data;
      } catch (error) {
        console.log(error)
        return error.response.data;
      }
    }
  );

  export const login = createAsyncThunk(
    "authentication/login",
    async (loginData) => {
      try {

        let res = await axios.post(authenticationAPI.login, loginData, {
          headers: {
            "Content-Type": "application/json",
          },
        });

        return res.data;
      } catch (error) {
        console.log(error)
        return error.response.data;
      }
    }
  );

  export const forgotPassword = createAsyncThunk(
    "authentication/forgotPassword",
    async (data) => {
      try {

        let res = await axios.post(authenticationAPI.forgotPassword, data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return res.data
      } catch (error) {
        console.log(error)
        return error.response.data;
      }
    }
  );

  export const resetPassword = createAsyncThunk(
    "authentication/resetPassword",
    async (data) => {
      try {
        console.log(authenticationAPI.resetPassword(data.userId))
        let newData = {
          newPassword: data.newPassword,
          resetToken: data.resetToken
        }
        let res = await axios.patch(authenticationAPI.resetPassword(data.userId), data, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        return res.data
      } catch (error) {
        console.log(error)
        return error.response.data;
      }
    }
  );

export const authenticationSlice = createSlice({
    name: 'authentication',
    initialState,
    reducers: {
      setRegisterSuccess: (state) => {
        state.registerSuccess = false
      }
    },
    extraReducers: (builder) => {
      builder.addCase(register.pending, (state, action) => {
        state.loading = true
      })

      builder.addCase(register.fulfilled, (state, action) => {
        state.loading = false
        state.registerSuccess = true
      })

      builder.addCase(register.rejected, (state, action) => {
        state.loading = false
      })

      builder.addCase(login.pending, (state, action) => {
        state.loading = true
      })

      builder.addCase(login.fulfilled, (state, action) => {
        state.loading = false
      })

      builder.addCase(login.rejected, (state, action) => {
        state.loading = false
      })

      builder.addCase(forgotPassword.pending, (state, action) => {
        state.loading = true
      })

      builder.addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false
        let newData = {
          email: action.payload.email,
          userId: action.payload.userId
        }
        state.changePasswordData = newData
      })

      builder.addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false
      })

      builder.addCase(resetPassword.pending, (state, action) => {
        state.loading = true
      })

      builder.addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false
      })

      builder.addCase(resetPassword.rejected, (state, action) => {
        state.loading = false
      })
    },
  })
  
  // Action creators are generated for each case reducer function
  export const { setRegisterSuccess } = authenticationSlice.actions
  
  export default authenticationSlice.reducer