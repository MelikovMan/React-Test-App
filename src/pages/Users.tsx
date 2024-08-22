import { ApiProvider } from "@reduxjs/toolkit/query/react";
import { userApi } from "../api/usersApi";
import UserList from "../components/UserList"
import { Container } from "@mui/material";
import ProfilesAppbar from "../components/ProfilesAppbar";
import { useParams } from "react-router-dom";
export default function Users(){
    const params = useParams<{page?:string}>();
    return(
    <Container disableGutters maxWidth={false}>
        <ProfilesAppbar/>
        <UserList page={params.page}/>
    </Container>
    );
}