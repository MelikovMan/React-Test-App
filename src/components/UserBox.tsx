import { Paper, Stack, Avatar, Typography } from "@mui/material";
import { User } from "../api/usersApi";
import { Link } from "react-router-dom";
import FavoriteIcon from '@mui/icons-material/Favorite';
import { useAppDispatch, useAppSelector } from "../state/hooks";
import { binarySearchElem, toggleFavorite } from "../state/userSlice";
import { useMemo } from "react";

export interface UserBoxProps {
    user: User
    children?: React.ReactNode
  }
  const boxSX = {
    transition: "border 50ms",
    transitionTimingFunction: "ease-out",
    "&:hover": {
        "border": "2px solid #1976d2",
    },
  };
export default function UserBox({user,children}:UserBoxProps){
  const Favorite = useAppSelector(state=>binarySearchElem(state.userSlice.users,user.id)?.favorite ?? null);
  const localAvatar = useAppSelector(state=>binarySearchElem(state.userSlice.users,user.id)?.customAvatar ?? null);
  const dispatch = useAppDispatch();
    return(
        <Link to={`/profile/${user.id}`}>
        <Paper sx={{...boxSX,p:1}}>
            <Stack direction="column"
              justifyContent="center"
              alignItems="center"
              spacing={2}
              sx={{minHeight: "270px"}}>
            <Avatar 
            src={localAvatar ?? user.avatar} 
            alt={`${user.first_name} ${user.last_name}`}
            sx={{ width: 'auto', height: 'auto' }}/>
            <Typography variant="h5">{`${user.first_name} ${user.last_name}`}</Typography>
            <FavoriteIcon onClick={(event)=>
            {event.preventDefault();
             event.stopPropagation();
             dispatch(toggleFavorite(user.id));
            }} sx={{alignSelf:"self-end",mr:1}}
            color={Favorite? "secondary": "inherit"}
            fontSize="large"/>
            </Stack>
        </Paper>
        </Link>
    )
}