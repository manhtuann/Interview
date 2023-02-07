import axios from 'axios';
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'

export interface AuthError {
    message: any
}
export interface AuthState {
    user?: CurrentUser
    isLoading: boolean
    error: AuthError
} 
export interface CurrentUser {
    id: string
    display_name: string
    email: string
    photo_url: string
}

const initialState : AuthState = {
    isLoading: false,
    error: {message: 'An Error occurred'},
  }
export const fetchUsers = createAsyncThunk('user/fetchUsers', (page :any) => {
    return axios 
        .get(`https://randomuser.me/api/?page=${page}&results=10`)
        .then(response => response.data
        
        )
})


const userSlice = createSlice({
    name: 'user',
    initialState,
    reducers: {},
    extraReducers: builder => {
        builder.addCase(fetchUsers.pending, state => {
          state.isLoading = true
        })
        builder.addCase(fetchUsers.fulfilled, (state, action) => {
          state.isLoading = false
          state.user = action.payload
        })
        builder.addCase(fetchUsers.rejected, (state, action) => {
          state.isLoading = false
        })
      }
})





export default userSlice.reducer