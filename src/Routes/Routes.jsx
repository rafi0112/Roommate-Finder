import { createBrowserRouter } from "react-router";
import Root from "../Pages/Root";
import Home from "../Pages/Home";
import Login from "../Pages/Login";
import Register from "../Pages/Register";
import GroupDetailsID from "../Pages/GroupDetailsID";
import PrivateRoute from "../contexts/PrivateRoute";
import NotFound from "../Pages/NotFound";
import AddRoommateListing from "../Pages/AddRoommateListing";
import BrowseListings from "../Pages/BrowseListings";
import MyListings from "../Pages/MyListings";
import UpdatePost from "../Pages/UpdatePost";


export const router = createBrowserRouter([
    { 
        path: "/", 
        element: <Root />,  
        children:[
            {
                index: true, 
                loader: ()=>fetch("https://roommate-server-lime.vercel.app/roommate"),
                element: <Home />,
            },
            {
                path: "/browse-listings",
                loader: ()=>fetch("https://roommate-server-lime.vercel.app/roommate"),
                element: <BrowseListings /> 
            },
            {
                path: "/add-listing",
                
                element: <PrivateRoute><AddRoommateListing /></PrivateRoute> 
            },
            {
                path: "/my-listings",
                loader: ()=>fetch("https://roommate-server-lime.vercel.app/roommate"),
                element: <PrivateRoute><MyListings /></PrivateRoute>  
            },
            {
                path: "/listings/:id",
                loader: ()=>fetch("https://roommate-server-lime.vercel.app/roommate"),
                element: <PrivateRoute><GroupDetailsID /></PrivateRoute>  
            },
            {
                path: "/edit-listing/:id",
                loader: ({params})=>fetch(`https://roommate-server-lime.vercel.app/roommate/${params.id}`),
                element: <PrivateRoute><UpdatePost /></PrivateRoute>  
            },
            {
                path: "/login",
                element: <Login/>
            },
            {
                path: "/register",
                element: <Register/>
            },
            {
                path: "*",
                element: <NotFound/>
            }
        ]
        
    },
    {
        path: "*",
        element: <NotFound/>
    }
]);

