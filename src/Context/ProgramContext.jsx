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

    // const OpenModalProgram = (content,id) => {
    //
    //     setActiveContent(content)
    //     setProgramID(id)
    //     setOpen(!open)
    // }



    // const RenderModalContent = () => {
    //     switch (activeContent) {
    //         case "gallery":
    //             return <Gallery/>
    //         case "manage":
    //             return <ManageProgram loading={loading} ListOfParticipants={ListOfParticipants} />
    //         default:
    //             return <Loader/>
    //     }
    // }


    return (
        <ProgramContext.Provider value={{activeContent,setActiveContent, open,ProgramData,ListOfParticipants}}>
            {children}
        </ProgramContext.Provider>
    );
}

export default ProgramProvider;