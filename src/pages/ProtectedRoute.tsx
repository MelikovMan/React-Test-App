import { Navigate, Outlet, useLocation } from "react-router-dom";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { useAppSelector } from "../state/hooks";
import { TokenStatus } from "../state/authSlice";

export const ProtectedRoute = () => {
    const { token, status } = useAppSelector(state=>state.authSlice);
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(()=>{
     if(token && location.pathname === "/") navigate("/profiles");
     if (!token) navigate("/login");
    },[token]);
  
    if (status === TokenStatus.FETCHING) {
        return (
      <Backdrop
        sx={{ color: '#fff', zIndex: (theme) => theme.zIndex.drawer + 1 }}
        open={true}
      >
        <CircularProgress color="inherit" />
      </Backdrop>);
      }
    if (!token) {
      return <Navigate to="/login" />;
    }
  
    return <Outlet />;
  };