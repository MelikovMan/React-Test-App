
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import LogoutIcon from '@mui/icons-material/Logout';
import {  Button} from '@mui/material';
import { useLogoutMutation } from '../api/usersApi';


const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  //alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 270,
  },
}));

export default function ProminentAppBarProfile() {
  const[logout] = useLogoutMutation();
  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static">
        <StyledToolbar>
            <Typography variant='h6' display={{xs:"block",md:"none"}}> 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, q
              uis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
            <Typography variant='h4' display={{xs:"none",md:"block"}}> 
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, q
              uis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.
            </Typography>
          <IconButton onClick={()=>{logout()}} size="large" aria-label="search" color="inherit" sx={{ p: 0, pt:"12px", alignSelf: "start", display:{xs:"block",sm:"none"} }}>
            <LogoutIcon />
          </IconButton>
          <Button
           color="secondary"
            variant="outlined"
            sx={{ alignSelf: "flex-start" , display:{xs:"none",sm:"block"},p:1 }}
            onClick={()=>{logout()}}
          >
            <Typography sx={{fontSize: "0.7rem"}} >Выход</Typography>
          </Button>
        </StyledToolbar>
      </AppBar>
    </Box>
    
  );
}