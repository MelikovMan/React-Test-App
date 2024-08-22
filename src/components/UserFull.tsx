import { ReactElement } from "react";
import { User } from "../api/usersApi";
import {useGetUserQuery} from '../api/usersApi'; 
import ToolbarFullProfile from "./ToolbarFullProfile";
import { Box, Container, Grid, Skeleton, Stack, Typography, useMediaQuery, useTheme } from "@mui/material";
import EmailIcon from '@mui/icons-material/Email';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';

export interface UserFullInfoProps {
    id:string,
    children?:React.ReactNode
}


export default function UserFullInfo({id,children}:UserFullInfoProps){
    const { data: user , isLoading, isFetching,isError } = useGetUserQuery(parseInt(id));
    const theme = useTheme();
    const isBig = useMediaQuery(theme.breakpoints.up('sm'));
    if (isError){
        return (
            <div>Error</div>
        )
    }
    if (isFetching){
        return(
            <>
            <Skeleton width={"100%"} height={280}/>
            <Skeleton width={"100%"} height={"50vh"} animation="wave"/>
            </>
        )
    }
    return(
        <div>
            <Container maxWidth={false} disableGutters>
            <ToolbarFullProfile id ={user?.data.id ?? 1} first_name={user?.data.first_name ?? "Test"} last_name={user?.data.last_name ?? "Test"} avatar={user?.data.avatar ?? "Test"}/>
            <Grid   container
              justifyContent="flex-start"
             alignItems="center"
             columns={{ xs: 2, sm: 8, md: 8 }}
             spacing={{ xs: 2, md: 3 }}
             sx={{p:2,boxSizing:"border-box"}}>
                <Grid item xs={2} sm={4} md={5} order={{xs:2,sm:1}}>
                  <Stack>
                    <Typography sx={{fontSize:{xs:"1rem",sm:"1rem"}}}>
                     "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, q
                      uis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse 
                      cillu  m dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
                    </Typography>
                  </Stack>
                </Grid>
                <Grid item xs={2} sm={4} md={3} order={{xs:1,sm:2}} p={0}>
                <Stack sx={{overflow:"auto"}}>
                    <Stack direction="row" justifyContent={{xs:"center",md:"left"}}>
                    <EmailIcon sx={{mr:1}}/>
                    <Typography variant="h6">
                        {`${user?.data.email}`}
                    </Typography>
                    </Stack>
                    <Stack direction="row" justifyContent={{xs:"center",md:"left"}}>
                    <LocalPhoneIcon sx={{mr:1}}/>
                    <Typography variant="h6">
                        {`8 800 555 35 35`}
                    </Typography>
                    </Stack>
                </Stack>
                </Grid>
            </Grid>
            </Container>
        </div>
    );
};