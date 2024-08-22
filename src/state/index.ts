import { configureStore } from "@reduxjs/toolkit";
import { userApi } from "../api/usersApi";
import authReducer from "./authSlice";
import userReducer from "./userSlice"

export const store = configureStore({
    reducer: {
        authSlice: authReducer,
        userSlice: userReducer,
        [userApi.reducerPath]: userApi.reducer
    },
    middleware: (getDefaultMiddleware)=>getDefaultMiddleware().concat(userApi.middleware)
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch