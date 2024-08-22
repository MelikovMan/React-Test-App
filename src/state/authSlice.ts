import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from './index.js'

export enum TokenStatus {
    IDLE,
    FETCHING,
    ERROR
}

interface TokenState {
    token:string|null,
    status: TokenStatus,
    error:string|null,
}
const initialState: TokenState = {
    token:localStorage.getItem("token"),
    status: TokenStatus.IDLE,
    error:null,
}

export const authSlice = createSlice({
    name: 'authSlice',
    initialState,
    reducers: {
        setToken: (state,action:PayloadAction<string>)=>{
            state.token=action.payload;
            state.status= TokenStatus.IDLE;
            state.error=null;
        },
        removeToken: (state)=>{
            state.token=null;
            state.status=TokenStatus.IDLE;
            state.error=null;
        },
        setFetching: (state)=>{
            state.status = TokenStatus.FETCHING;
            state.error=null;
        },
        setError: (state,action:PayloadAction<string>)=>{
            state.status = TokenStatus.ERROR;
            state.error = action.payload;
        }
    }
})

export const { setToken, removeToken, setFetching, setError } = authSlice.actions

export default authSlice.reducer