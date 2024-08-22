import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Users from "./Users";
import UserDetails from "./UserDetails";
import { useAppSelector } from "../state/hooks";
import { ProtectedRoute } from "./ProtectedRoute";
import LoginPage from "./LoginPage";
import Register from "./Register";

const Routes = () => {
    const token = useAppSelector(state=>state.authSlice.token)
    //const token = true;
    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <ProtectedRoute/>,
            children:[
                {
                    path: "profiles/:page?",
                    element: <Users/>,
                },
                {
                    path: "profile/:userId",
                    element: <UserDetails/>,
                },
            ]
        }
        

    ];
    const routesForNotAuthenticatedOnly = [
        {
            path: "/login",
            element: <LoginPage/>,
        },
        {
            path: "/register",
            element: <Register/>,
        }
    ];
    const router = createBrowserRouter([
        ...routesForNotAuthenticatedOnly,
        ...routesForAuthenticatedOnly
      ]);
    
      // Provide the router configuration using RouterProvider
      return <RouterProvider router={router} />;
}
export default Routes;