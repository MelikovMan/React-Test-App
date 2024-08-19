import { Paper, Stack, Avatar, Typography } from "@mui/material";
import { User } from "../api/usersApi";
import { Link } from "react-router-dom";

export interface UserBoxProps {
    user: User
    children?: React.ReactNode
  }

export default function UserBox({user,children}:UserBoxProps){
    return(
        <Link to={`/${user.id}`}>
        <Paper>
            <Stack direction="column"
              justifyContent="center"
              alignItems="center"
              sx={{minHeight: "270px"}}>
            <Avatar 
            src={user.avatar} 
            alt={`${user.first_name} ${user.last_name}`}
            sx={{ width: 'auto', height: 'auto' }}/>
            <Typography variant="h5">{`${user.first_name} ${user.last_name}`}</Typography>
            </Stack>
        </Paper>
        </Link>
    )
}