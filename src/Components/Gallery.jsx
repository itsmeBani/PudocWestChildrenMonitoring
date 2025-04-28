import {Button, DialogHeader, IconButton, Input, Typography} from "@material-tailwind/react";
import React, {useEffect, useRef, useState} from "react";
import supabase from "../Firebase-config/supabase-config.js";
import {deleteDoc, doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../Firebase-config/firebase.js";
import {PhotoIcon} from "@heroicons/react/16/solid/index.js";
import Masonry from "react-layout-masonry";
import {TrashIcon} from "@heroicons/react/24/solid";
import {XMarkIcon} from "@heroicons/react/24/outline/index.js";
import Loader from "./Loader.jsx";
import Loaderupload from "./loaderupload.jsx";

export default function Gallery({ProgramID}) {
    const fileRef = useRef(null)
    const [images, setImagesUrl] = useState(null)
    const [loading, setLoading] = useState(false)
    const [stateMessage,setStateMessage]=useState({
        error: "",
        success:""
    })


    const HandlePickImage = () => {
        fileRef.current.click()
    }

    const FetchImages = async () => {
        try {
            const docRef = doc(db, "program", ProgramID);
            const docSnap = await getDoc(docRef);
            if (docSnap.exists()) {
                setImagesUrl(docSnap.data()?.images)
            } else {
                console.log("No such document!");
            }

        } catch (e) {
            console.log(e)
        }

    }

    useEffect(() => {
        FetchImages().then()
    }, [ProgramID]);


    const UploadImage = async (e) => {
        const image = e.target.files[0]
        setLoading(true)
        try {
            const {data, error} = await supabase
                .storage
                .from('poducwest')
                .upload(image.name, image, {
                    cacheControl: '3600',
                    upsert: true
                })
            const {data: ImageUrl, error: ErrorUrl} = supabase
                .storage
                .from('poducwest')
                .getPublicUrl(data?.path)
            if (ImageUrl?.publicUrl) {
                await updateDoc(doc(db, "program", ProgramID), {
                    images: [ImageUrl?.publicUrl, ...images]
                });
                setStateMessage({
                    success: "Successfully Upload",
                    error: ""
                })
                FetchImages().then()
            }
        } catch (e) {
            setStateMessage({
                success: "",
                error: "Failed to Upload"
            })
        } finally {
            setLoading(false)

            setTimeout(()=>{
                setStateMessage({
                    success: "",
                    error: ""
                })
            },1000)
        }
    }
    const DeleteImage = async (index) => {
        const filterImages = images?.filter((item, i) => i !== index);
        await updateDoc(doc(db, "program", ProgramID), {
            images: filterImages
        });
        FetchImages().then()
    }

    return (
        <section className=" flex flex-col gap-5 overflow-hidden ">

            <div className="  ">
                <Typography variant="h5" color="blueGray">
                    Event Gallery
                </Typography>
                <Typography className=" font-normal text-gray-600">
                    Below is a collection of memorable moments captured during this meaningful feeding program.
                </Typography>
            </div>

            <div className="flex w-full justify-between">
                <Button size={"sm"}
                        className="p-1 flex place-items-center capitalize gap-1 text-gray-700 border-gray-700 border-[2px]"
                        variant={"outlined"} color={"gray"} onClick={HandlePickImage}><PhotoIcon
                    className={"w-5"}/>Upload</Button>
                <input ref={fileRef} type={"file"} onChange={(e) => UploadImage(e)} className="hidden"/>

                {loading && <Loaderupload/>}
                {stateMessage.success &&   <code className='text-green-400'>{stateMessage.success &&  stateMessage.success}</code>}
                {stateMessage.error &&  <code className='text-red-400'>{stateMessage.error &&  stateMessage.error}</code>}
            </div>
            <div className="flex overflow-y-auto">
                <Masonry columns={{640: 1, 768: 2, 1024: 3, 1280: 3}} gap={10}>
                    {images?.map((url, index) => {
                        return <div className="relative  rounded-lg group">
                            <img src={url} alt="" className=" rounded-lg"/>
                            <div
                                className="hidden rounded-lg group-hover:block absolute top-0 w-full h-full bg-black/60"></div>
                            <button onClick={() => DeleteImage(index)}
                                    className="hidden  group-hover:block  absolute top-3 right-3"><TrashIcon
                                className={"w-5 text-white hover:text-red-400"}/></button>
                        </div>
                    })}
                </Masonry>
            </div>
        </section>
    );
}