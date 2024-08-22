import { ChangeEvent, useState } from "react"
import {useListUsersQuery} from "../api/usersApi"
import Grid from '@mui/material/Grid';
import { Pagination, Skeleton, Stack } from "@mui/material";
import UserBox from "./UserBox";
const UserList = () => {
    const [page, setPage] = useState(1)
    const { data: users , isLoading, isFetching,isError } = useListUsersQuery(page)
    const handleChange = (event:ChangeEvent<unknown>, page:number) => {
        setPage(page);
      };
  
    if (isLoading) {
      return (
        <>
        <Skeleton animation="pulse" height={"540px"} />
        </>
      )
    }
  
    if (!users?.data) {
      return <div>No posts :(</div>
    }

    return (
      <Grid container spacing={{ xs: 2, md: 3 }} columns={{ xs: 2, sm: 8, md: 12 }}>
      {users.data.map(({ id, email, first_name, last_name, avatar }) => (
        <Grid item xs={2} sm={4} md={3} key={id}>
        <UserBox user={{id,first_name, email, last_name,avatar}}/>
        </Grid>
      ))}
        <Grid item xs={12} sm={12} md={12}>
        <Stack alignItems="center">
           <Pagination count={users.total_pages} shape="rounded" onChange={handleChange} />
        </Stack>
        </Grid>
    </Grid>
    
    )
  }
export default UserList;