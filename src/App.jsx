import React, {useContext, useState} from 'react'

import './index.css'
import Map from "./Components/Map.jsx";
import Layout from "./Layout/Layout.jsx";
import {createBrowserRouter, RouterProvider} from "react-router-dom";
import Login from "./Pages/Login.jsx";
import Dashboard from "./Pages/Dashboard.jsx";
import ProtectedComponentContext from "./Context/ProtectedComponentContext.jsx";
import {AuthProviderContext} from "./Context/AuthProvider.jsx";
import _404 from "./Components/404.jsx";
import Children from "./Pages/Children.jsx";
import Programs from "./Pages/Programs.jsx";
import {FormProvider} from "./Context/FormContext.jsx";
import useFetchByCategory from "./CustomHook/useFetchByCategory.js";
import * as path from "node:path";
import ProgramProvider from "./Context/ProgramContext.jsx";

function App() {

    const router = createBrowserRouter([
        {
            path: "/",
            element:<ProtectedComponentContext><Layout/></ProtectedComponentContext>,
            children: [
                {
                    path: "/",
                    element: <Dashboard />,
                },
                {
                    path: "children",
                    element:<FormProvider><Children/></FormProvider>,
                },
                {
                    path: "programs",
                    element: <ProgramProvider><Programs /></ProgramProvider>,
                },
            ],
            errorElement:<_404/>
        },
    ]);
    return (
        <div className="">
         <RouterProvider   router={router}/>
        </div>
    )
}

export default App
