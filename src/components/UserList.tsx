import { ChangeEvent, useState } from "react"
import {useListUsersQuery} from "../api/usersApi"
import Grid from '@mui/material/Grid';
import { Alert, Pagination, Skeleton, Stack } from "@mui/material";
import UserBox from "./UserBox";
import { useNavigate } from "react-router-dom";
interface UserListProps {
  page?:string
}
const UserList = ({page}:UserListProps) => {
    //const navigate = useNavigate(); 
    //const parsedPage = page ? (parseInt(page) ?? 1) : 1;
    const [curPage, setPage] = useState<number>(1);
    const { data: users , isLoading, isFetching,isError } = useListUsersQuery(curPage);
    const handleChange = (event:ChangeEvent<unknown>, page:number) => {
        setPage(page);
      };
  
    if (isLoading || isFetching) {
      return (
        <>
        <Skeleton animation="pulse" height={"540px"} />
        </>
      )
    }
    if (isError) {
      return(
        <Alert severity='error' sx={{width:"100%", height:"50vh"}} >Невозможно получить список пользователей</Alert>
      )
    }
    if (!users?.data) {
      return <div>No users :(</div>
    }

    return (
      <Grid p={2} container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
      {users.data.map(({ id, email, first_name, last_name, avatar }) => (
        <Grid item xs={2} sm={4} md={3} key={id}>
        <UserBox user={{id,first_name, email, last_name,avatar}}/>
        </Grid>
      ))}
        <Grid item xs={12} sm={12} md={12}>
        <Stack alignItems="center">
           <Pagination count={users.total_pages} shape="rounded" onChange={handleChange} defaultPage={curPage} />
        </Stack>
        </Grid>
    </Grid>
    
    )
  }
export default UserList;