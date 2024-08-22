import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { userApi } from "../api/usersApi";
import UserList from "../components/UserList"
export default function Users(){
    return(
    //<ApiProvider api = {userApi}>
        <UserList/>
    //</ApiProvider>
    );
}