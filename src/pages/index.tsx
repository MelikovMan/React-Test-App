import { RouterProvider, createBrowserRouter } from "react-router-dom";
import Users from "./Users";
import UserDetails from "./UserDetails";

const Routes = () => {
    const token = true;
    const routesForAuthenticatedOnly = [
        {
            path: "/",
            element: <Users/>,
        },
        {
            path: "/:userId",
            element: <UserDetails/>,
        },
    ];
    const routesForNotAuthenticatedOnly = [
        {
            path: "/",
            element: <div>Login</div>,
        },
    ];
    const router = createBrowserRouter([
        ...(!token ? routesForNotAuthenticatedOnly : routesForAuthenticatedOnly)
      ]);
    
      // Provide the router configuration using RouterProvider
      return <RouterProvider router={router} />;
}
export default Routes;