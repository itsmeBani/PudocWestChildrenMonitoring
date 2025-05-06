import React, {createContext, useEffect, useState} from "react";
import Gallery from "../Components/Gallery.jsx";
import Login from "../Pages/Login.jsx";
import Loader from "../Components/Loader.jsx";
import ManageProgram from "../Components/ManageProgram.jsx";
import {addDoc, deleteDoc,updateDoc, getDocs,collection, doc,serverTimestamp} from "firebase/firestore";
import {db} from "../Firebase-config/firebase.js";
import useFetchPrograms from "../CustomHook/useFetchPrograms.js";

export  const ProgramContext = createContext({})

function ProgramProvider({children}) {

    const {setProgramID,ProgramData,ListOfParticipants,loading}=useFetchPrograms()
    const [activeContent,setActiveContent]=useState("")
    const [open, setOpen] = React.useState(false);
    return (
        <ProgramContext.Provider value={{activeContent,setActiveContent, open,ProgramData,ListOfParticipants}}>
            {children}
        </ProgramContext.Provider>
    );
}

export default ProgramProvider;