import React, {useContext, useEffect, useState} from 'react';
import {Button, Input, Popover, PopoverContent, PopoverHandler, Typography} from "@material-tailwind/react";
import ProgramCard from "../Components/ProgramCard.jsx";
import Gallery from "../Components/Gallery.jsx";
import ManageProgram from "../Components/ManageProgram.jsx";
import Loader from "../Components/Loader.jsx";
import useFetchPrograms from "../CustomHook/useFetchPrograms.js";
import {ProgramModal} from "../Components/ProgramModal.jsx";
import {addDoc, collection, deleteDoc, doc, serverTimestamp, writeBatch} from "firebase/firestore";
import {db} from "../Firebase-config/firebase.js";
import InputFilter from "../Components/InputFilter.jsx";

function Programs(props) {
    const {ProgramID, ProgramData, setProgramID,Reload} = useFetchPrograms()
    const [activeContent, setActiveContent] = useState()
    const [OpenModal, setOpenModal] = useState(false)
    const [openPopover, setPopover] = useState(false);
    const [loadingNewProgram,setLoadingNewProgram]=useState(false)
    const [ProgramList,setProgramList]=useState([])
    const options =(search,data)=> data?.filter(item =>
        item?.programName?.toLowerCase().includes(search.toLowerCase())
    );

    const RenderModalContent = () => {
        switch (activeContent) {
            case "gallery":
                return <Gallery   ProgramID={ProgramID}/>
            case "manage":
                return <ManageProgram ProgramID={ProgramID}/>
            default:
                return <Loader/>
        }
    }
  const ModalSize=activeContent === "gallery" ? "xl" : "md"

    const HandleOpenModal = () => {
        setOpenModal(true)
    }
    const HandleCloseModal = () => {
        setOpenModal(false)
    }
    const HandleChangeContent = (content, id) => {
        setActiveContent(content)
        setProgramID(id)
        HandleOpenModal()
    }




    const InsertProgram = async (e) => {
        e.preventDefault()
        setLoadingNewProgram(true)
        const ProgramName = e.target[0].value
        const Date = e.target[1].value
        if (!Date || !ProgramName) {
            alert("fill all the fields")
            return false
        }
        try {
            await addDoc(collection(db, "program"), {
                dateCreated: serverTimestamp(),
                date: Date,
                programName: ProgramName
            });

        } catch (e) {
            console.log(e)
        }finally {

            e.target.reset()
            setLoadingNewProgram(false)
            setPopover(false)
            Reload()
        }


    }


    const DeleteProgram=async (id)=>{
        if (!id) return
        try {
            await deleteDoc(doc(db, "program", id));
            Reload()
            console.log("Document deleted successfully!");
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    }

    return (
        <section className="md:p-3  pb-2  flex-1">
            <div className="content h-full flex flex-col ">
                <div className="flex md:flex-row flex-col items-center justify-between w-full md:my-  sm:pr-4">
                    <div className="flex px-4 md:pt-3 pb-2 flex-col">
                        <Typography className="text-[18px] md:text-2xl font-bold leading-1" variant="p">
                            Programs in Pudoc West
                        </Typography>
                        <Typography className=" text-[12px] md:text-[14px] leading-4 md:leading-[20px] text-gray-700">
                            This effort aims to improve community involvement and promote better nutrition for children.
                        </Typography>
                    </div>
                    <div className="flex w-full p-2 place-content-end md:items-center">
                        <Popover open={openPopover} handler={()=>setPopover(!openPopover)} placement={"top-end"} offset={{alignmentAxis: 20, mainAxis: 10}}
                                 animate={{
                                     mount: {scale: 1, y: 0},
                                     unmount: {scale: 0, y: 25},
                                 }}
                        >
                            <PopoverHandler  >
                                <button onClick={()=>setPopover(!openPopover)}
                                    className="bg-indigo-600 px-5 py-2 text-[10px] md:text-sm shadow-sm font-semibold tracking-wider text-white rounded-full hover:bg-gray-800">Add
                                    Program
                                </button>
                            </PopoverHandler>
                            <PopoverContent>

                                <form onSubmit={(e) => InsertProgram(e)} className="flex flex-col gap-3">
                                    <Typography variant="small" color="blue-gray"
                                                className="mb-2 text-left text-normal text-black md:font-medium">
                                        New Program
                                    </Typography>
                                    <Input variant="" label="Name" placeholder="....."/>
                                    <Input type={"date"} label="Date" placeholder="00/00/0000"/>
                                    <Button type={"submit"} loading={loadingNewProgram} className="w-full bg-indigo-600 rounded-full text-center flex place-items-center justify-center">{!loadingNewProgram && "Save"}</Button>
                                </form>
                            </PopoverContent>
                        </Popover>
                    </div>
                </div>

                <div className="flex w-full justify-end">
                    <InputFilter options={options} data={ProgramData} setData={setProgramList}/>
                </div>


                <div
                    className="grid mt-2 overflow-y-auto px-3 md:px-5  gap-2 grid-cols-1 md:grid-cols-2 xl:grid-cols-2">
                    {ProgramList?.map((programData) => {
                        return <ProgramCard  key={ProgramData.id} onDelete={DeleteProgram} onClick={HandleChangeContent} data={programData}/>
                    })}
                </div>

                <ProgramModal size={ModalSize}  HandleOpenModal={HandleOpenModal} HandleCloseModal={HandleCloseModal}
                              OpenModal={OpenModal}>
                    <RenderModalContent/>

                </ProgramModal>
            </div>

        </section>
    );
}

export default Programs;