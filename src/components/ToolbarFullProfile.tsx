import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { Button, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';

const StyledToolbar = styled(Toolbar)(({ theme }) => ({
  //alignItems: 'flex-start',
  paddingTop: theme.spacing(1),
  paddingBottom: theme.spacing(2),
  // Override media queries injected by theme.mixins.toolbar
  '@media all': {
    minHeight: 270,
  },
}));
export interface ProminentAppBarProfileProps {
    avatar:string,
    last_name:string,
    first_name:string,
    children?:React.ReactNode,
}

export default function ProminentAppBarProfile({avatar, last_name, first_name, children}:ProminentAppBarProfileProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const isBig = useMediaQuery(theme.breakpoints.up('sm'));
  const text = (isBig)? "start" : "center";
  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static">
        <StyledToolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2, alignSelf: "flex-start" , display:{xs:"block",sm:"none"} }}
            onClick={()=>{navigate("/")}
          }
          >
            <ArrowBackIcon />
          </IconButton>
          <Button
           color="secondary"
            variant="outlined"
            sx={{alignSelf: "flex-start" , display:{xs:"none",sm:"block"},p:1 }}
            onClick={()=>{navigate("/")}
          }
          >
            <Typography sx={{fontSize: "0.7rem"}}>Назад</Typography>
          </Button>
            <Grid   container
              direction="row"
              justifyContent="flex-start"
             alignItems="center"
             columns={{ xs: 2, sm: 8, md: 8 }}>
                <Grid item xs={2} sm={2} md={2}>
                  <Stack>
                    <Avatar 
                    src={avatar} 
                    alt={`${first_name} ${last_name}`}
                    sx={{ width: 'auto', height: 'auto' }}/>
                  </Stack>
                </Grid>
                <Grid item xs={2} sm={6} md={6}>
                <Stack sx={{ml:2,textAlign: "start", display:{xs:"none",sm:"block"}}}>
                    <Typography variant="h3">{`${first_name} ${last_name}`}</Typography>
                    <Typography variant="h4">{`Placeholder job`}</Typography>
                </Stack>
                <Stack sx={{display:{xs:"block",sm:"none"}}}>
                    <Typography variant="h3">{`${first_name} ${last_name}`}</Typography>
                    <Typography variant="h4">{`Placeholder job`}</Typography>
                </Stack>
                </Grid>
            </Grid>
          <IconButton size="large" aria-label="search" color="inherit" sx={{ mr: 2, alignSelf: "flex-start", display:{xs:"block",sm:"none"} }}>
            <LogoutIcon />
          </IconButton>
          <Button
           color="secondary"
            variant="outlined"
            sx={{ alignSelf: "flex-start" , display:{xs:"none",sm:"block"},p:1 }}
          >
            <Typography sx={{fontSize: "0.7rem"}} >Выход</Typography>
          </Button>
        </StyledToolbar>
      </AppBar>
    </Box>
  );
}