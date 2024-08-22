import * as React from 'react';
import { styled } from '@mui/material/styles';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';
import { Close } from '@mui/icons-material';
import LogoutIcon from '@mui/icons-material/Logout';
import MoreIcon from '@mui/icons-material/MoreVert';
import Grid from '@mui/material/Grid';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
import { useNavigate } from 'react-router-dom';
import { Alert, Button, Snackbar, SnackbarCloseReason, useMediaQuery } from '@mui/material';
import { useTheme } from '@mui/material';
import { useLogoutMutation } from '../api/usersApi';
import { useState } from 'react';
import { useAppDispatch, useAppSelector } from '../state/hooks';
import { binarySearchElem, setAvatar } from '../state/userSlice';
import smartcrop, { CropResult } from 'smartcrop';

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
    id:number,
    avatar:string,
    last_name:string,
    first_name:string,
    children?:React.ReactNode,
}
const file2Base64 = (file:File):Promise<string> => {
  return new Promise<string> ((resolve,reject)=> {
       const reader = new FileReader();
       reader.readAsDataURL(file);
       reader.onload = () => resolve(reader.result?.toString() ?? '');
       reader.onerror = error => reject(error);
   })
  }
  function resizeImage(b64:string, width:number, height:number, x:number, y:number) {
    return new Promise<string>((resolve,reject)=>{
      let canvas = document.createElement("canvas");
      let context = canvas.getContext('2d');
      if (context == null) reject("Couldn't load context");
      let imageObj = new Image();
      canvas.width = 128;
      canvas.height = 128;
      imageObj.onload = function () {
          if(context == null) return;
          context.drawImage(imageObj, x, y, width, height, 0, 0, 128, 128);
          const result = canvas.toDataURL();
          canvas.remove()
          resolve(result);
      };
      imageObj.onerror = (error)=>reject(error)
      imageObj.src = b64;
    })

}
async function crop (b64:string){
  return new Promise<CropResult>((resolve,reject)=>{
    let image = new Image();
    image.onload =  async function(){
     let cropdata = await smartcrop.crop(image,{height:128,width:128})
     console.log(cropdata.topCrop)
     resolve(cropdata);
    }
    image.onerror = (error)=>reject(error)
    image.src = b64;
  })
}
export default function ProminentAppBarProfile({id, avatar, last_name, first_name, children}:ProminentAppBarProfileProps) {
  const navigate = useNavigate();
  const theme = useTheme();
  const[logout] = useLogoutMutation();
  const localAvatar = useAppSelector(state=>binarySearchElem(state.userSlice.users,id)?.customAvatar ?? null);
  const dispatch = useAppDispatch();
  const [tempAvatar,setTempAvatar]=useState<string|null>(null);
  const [openErrorSnackbar,setOpenErrorSnackbar]=useState<string|null>(null);
  const [openConfirmSnackbar,setOpenConfirmSnackbar]=useState<boolean|null>(false);
  const handleClose = (
    closeCallback: React.Dispatch<React.SetStateAction<boolean|null>> | React.Dispatch<React.SetStateAction<string|null>>,
    event?: React.SyntheticEvent | Event,
    reason?: SnackbarCloseReason,
    
  ) => {
    if (reason === 'clickaway') {
      return;
    }

    closeCallback(null);
    setTempAvatar(null);
  };
  const handleConfirm = () =>{
    dispatch(setAvatar({id: id, avatar: tempAvatar}))
    setTempAvatar(null);
    setOpenConfirmSnackbar(false);
  }
  const confirmAction = (
    <>
      <Button color="secondary" size="small" onClick={()=>{handleConfirm()}}>
        CONFIRM
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={()=>handleClose(setOpenConfirmSnackbar)}
      >
        <Close fontSize="small" />
      </IconButton>
    </>
  );
  return (
    <Box sx={{ width: "100%" }}>
      <AppBar position="static">
        <StyledToolbar>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            sx={{ mr: 2, alignSelf: "flex-start" , display:{xs:"block",sm:"none"} }}
            onClick={()=>{navigate("/profiles")}
          }
          >
            <ArrowBackIcon />
          </IconButton>
          <Button
           color="secondary"
            variant="outlined"
            sx={{alignSelf: "flex-start" , display:{xs:"none",sm:"block"},p:1 }}
            onClick={()=>{navigate("/profiles")}
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
                  <Stack spacing={2}>
                    <Avatar 
                    src={tempAvatar ?? localAvatar ?? avatar} 
                    alt={`${first_name} ${last_name}`}
                    sx={{ width: 'auto', height: 'auto' }}/>
                    <Button color="secondary" variant='outlined' onClick={()=>document.getElementById('fileAvatarInput')?.click()}> 
                      Изменить аватар </Button>
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
      <input id="fileAvatarInput" type="file" accept="image/png, image/jpeg" style={{display:"none"}} 
      onChange={async (event)=>{
          if (openConfirmSnackbar) setOpenConfirmSnackbar(false);
          if (openErrorSnackbar) setOpenErrorSnackbar(null);
          if (!event.target.files) return;
          if (!event.target.files[0]) return;
          const file = event.target.files[0];
          const fileMb = file.size / 1024 ** 2;
          if (fileMb > 10){
            setOpenErrorSnackbar("Error: File Size too big! Max: 10mb");
            return;
          }
          try {
            const b64 = await file2Base64(file);
            const {topCrop} = await crop(b64);
            const finalImage = await resizeImage(b64,topCrop.width, topCrop.height, topCrop.x, topCrop.y);
            setTempAvatar(finalImage);
            setOpenConfirmSnackbar(true);
          } catch(err){
            setOpenErrorSnackbar(`Error on file convert: ${JSON.stringify(err)}`);
          }
      }}/>
      <Snackbar open={openErrorSnackbar? true:false} autoHideDuration={6000} onClose={(event,reason)=>handleClose(setOpenErrorSnackbar,event,reason)}>
        <Alert
          onClose={()=>handleClose(setOpenErrorSnackbar)}
          severity="error"
          variant="filled"
          sx={{ width: '100%' }}
        >
          {openErrorSnackbar}
        </Alert>
      </Snackbar>
      <Snackbar
        open={openConfirmSnackbar ? true: false}
        onClose={(event,reason)=>handleClose(setOpenConfirmSnackbar,event,reason)}
        message="Confirm Avatar Change!"
        action={confirmAction}
      />
    </Box>
    
  );
}