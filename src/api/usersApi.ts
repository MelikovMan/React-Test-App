import {createApi, fetchBaseQuery} from '@reduxjs/toolkit/query/react';

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

export interface Response<T>{
    data: T,
}
export const userApi = createApi({
    reducerPath: "userApi",
    baseQuery: fetchBaseQuery({baseUrl:"https://reqres.in/api/"}),
    tagTypes: ["users"],
    endpoints: (builder)=>({
        listUsers: builder.query<ListResponse<User>,number|void>({
            query:(page=1)=>`users?page=${page}&per_page=8`
        }),
        getUser: builder.query<Response<User>,number|void>({
            query:(page=1)=>`users/${page}`
        }),
    })
})

export const { useListUsersQuery, useGetUserQuery } = userApi