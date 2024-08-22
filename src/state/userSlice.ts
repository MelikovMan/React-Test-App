import { createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from "@reduxjs/toolkit";
import type { RootState } from './index.js'

interface LocalUser{
    id:number,
    favorite:boolean,
    customAvatar:string|null
}
interface LocalUserState{
    users:LocalUser[]
}
export function binarySearch(arr:LocalUser[], val:number):number {
    let start = 0;
    let end = arr.length - 1;
    while (start <= end) {
      let mid = Math.floor((start + end) / 2);
      if (arr[mid].id === val) {
        return mid;
      }
      if (val < arr[mid].id) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
    return -1;
}

export function binarySearchElem(arr:LocalUser[], val:number):LocalUser|null {
    let start = 0;
    let end = arr.length - 1;
    while (start <= end) {
      let mid = Math.floor((start + end) / 2);
      if (arr[mid].id === val) {
        return arr[mid];
      }
      if (val < arr[mid].id) {
        end = mid - 1;
      } else {
        start = mid + 1;
      }
    }
    return null;
}
const initialState:LocalUserState =  JSON.parse(localStorage.getItem("localUser") ?? '{"users":[]}');
const userSlice = createSlice({
    name:"userSlice",
    initialState,
    reducers: {
        toggleFavorite(state,action:PayloadAction<number>){
            const ind = binarySearch(state.users,action.payload);
            if(ind === -1){
                state.users = [...state.users, {id:action.payload,favorite:true,customAvatar:null}].sort((a,b)=>a.id-b.id);
            }
            else {
                state.users[ind].favorite = !state.users[ind].favorite;
            }
            localStorage.setItem("localUser", JSON.stringify(state));
        },
        setAvatar(state,action:PayloadAction<{id:number,avatar:string|null}>){
            const ind = binarySearch(state.users,action.payload.id);
            if(ind === -1){
                state.users = [...state.users, {id:action.payload.id,favorite:false,customAvatar:action.payload.avatar}].sort((a,b)=>a.id-b.id);
            }
            else {
                state.users[ind].customAvatar = action.payload.avatar;
            }
            localStorage.setItem("localUser", JSON.stringify(state));
        }

    }


})

export const { toggleFavorite, setAvatar } = userSlice.actions

export default userSlice.reducer