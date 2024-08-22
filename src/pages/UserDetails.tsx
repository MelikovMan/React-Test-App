import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { userApi } from "../api/usersApi";
import UserFullInfo from "../components/UserFull";
import { useParams } from "react-router-dom";

export default function UserDetails(){
    const params = useParams<{userId:string}>();
    return(
            <UserFullInfo id={params.userId ?? "-1"}/>

        );
}   