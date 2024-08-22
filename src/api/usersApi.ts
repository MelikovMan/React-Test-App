import {createApi, fetchBaseQuery, FetchBaseQueryError} from '@reduxjs/toolkit/query/react';
import { removeToken, setError, setFetching, setToken } from '../state/authSlice';
import { isFetchBaseQueryErrorNested } from './helpers';

export interface User {
    id:number,
    email:string,
    first_name:string,
    last_name:string,
    avatar:string,
}
export interface ListResponse<T>{
    page:number,
    per_page:number,
    total:number,
    total_pages:number,
    data: T[],
}
export interface RegisterRequest{
    email:string,
    password:string,
}
export interface RegisterResponse{
    id:string,
    token:string,
}
export interface LoginRequest{
    email:string,
    password:string,
}
export interface LoginResponse{
    token:string,
}
export interface Response<T>{
    data: T,
}
export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({baseUrl:"https://reqres.in/api/"}),
    tagTypes: ["User"],
    endpoints: (builder)=>({
        listUsers: builder.query<ListResponse<User>,number|void>({
            query:(page=1)=>`users?page=${page}&per_page=8`,
            providesTags: (result, error, arg) =>
                result
                  ? [...result.data.map(({ id }) => ({ type: 'User' as const, id })), 'User']
                  : ['User'],
        }),
        getUser: builder.query<Response<User>,number|void>({
            query:(user=1)=>`users/${user}`,
            providesTags: (result,error,arg)=>
                result ? [{type: 'User', id: result.data.id}, 'User']
                        : ['User'],

        }),
        register: builder.mutation<RegisterResponse,RegisterRequest>({
            query: (user) =>{
                return{
                    url:"register",
                    method: "POST",
                    body: user
                }
            },
            async onQueryStarted(arg, {dispatch,queryFulfilled}) {
                dispatch(setFetching());
                try {
                    const {data} = await queryFulfilled;
                    localStorage.setItem("token",data.token);
                    dispatch(setToken(data.token));
                } catch (err){
                    dispatch(setError(JSON.stringify(err)));
                }
            },
        }),
        login: builder.mutation<LoginResponse,LoginRequest>({
            query: (user) => {
                return {
                    url:"login",
                    method:"POST",
                    body:user,
                }
            },
            async onQueryStarted(arg, {dispatch,queryFulfilled}) {
                dispatch(setFetching())
                try {
                    const {data} = await queryFulfilled;
                    localStorage.setItem("token",data.token);
                    dispatch(setToken(data.token));
                } catch (err){
                    dispatch(setError(JSON.stringify(err)));
                }
            },
        }),
        
        logout: builder.mutation<void,void>({
            query: () => {
                return {
                    url:"logout",
                    method:"POST",
                }
            },
            async onQueryStarted(arg, {dispatch,queryFulfilled}) {
                dispatch(setFetching());
                try {
                    await queryFulfilled;
                    localStorage.removeItem("token");
                    dispatch(removeToken());
                } catch (err){
                    dispatch(setError(JSON.stringify(err)));
                }
            },
        })
    })
})

export const { useListUsersQuery, 
    useGetUserQuery,
    useRegisterMutation,
    useLoginMutation,
    useLogoutMutation } = userApi