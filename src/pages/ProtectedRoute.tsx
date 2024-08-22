import { Navigate, Outlet } from "react-router-dom";
import { Backdrop } from "@mui/material";
import { CircularProgress } from "@mui/material";
import { useAppSelector } from "../state/hooks";
import { TokenStatus } from "../state/authSlice";

export const ProtectedRoute = () => {
    const { token, status } = useAppSelector(state=>state.authSlice);
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