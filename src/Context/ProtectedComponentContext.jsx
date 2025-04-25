import React, {createContext, useContext} from 'react';
import Login from "../Pages/Login.jsx";
import {AuthProviderContext} from "./AuthProvider.jsx";
import Loader from "../Components/Loader.jsx";


export const ProtectedContext=createContext({})
function ProtectedComponentContext({children}) {
    const {User,ALLOWED_ROLE}=useContext(AuthProviderContext)
    const ACCEPTED_ROLE=ALLOWED_ROLE.includes(User?.Role)
    if (User === null){
        return <Loader/>
    }
    if (!ACCEPTED_ROLE){
        console.log("Permission Denied")
        return <Login/>
    }
    return (
        <ProtectedContext.Provider value={{}}>
            {children}
        </ProtectedContext.Provider>
    );
}
export default ProtectedComponentContext;