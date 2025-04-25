import React from 'react';
import Sidebar from "../Components/Sidebar.jsx";
import Map from "../Components/Map.jsx";
import Login from "../Pages/Login.jsx";
import {
    createBrowserRouter, Outlet,
    RouterProvider,
} from "react-router-dom";


function Layout(props) {


    return (
        <section className="h-full md:h-screen   flex flex-col  md:flex-row   bg-[#eaf0f9]" >
           <Sidebar/>
           <Outlet/>
        </section>
    );
}

export default Layout;
