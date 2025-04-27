import {Button, Input} from "@material-tailwind/react";
import {useEffect, useRef, useState} from "react";
import supabase from "../Firebase-config/supabase-config.js";
import {deleteDoc, doc, getDoc, updateDoc} from "firebase/firestore";
import {db} from "../Firebase-config/firebase.js";
import {PhotoIcon} from "@heroicons/react/16/solid/index.js";
import Masonry from "react-layout-masonry";
import {TrashIcon} from "@heroicons/react/24/solid";

export default function Gallery({ProgramID}) {
const fileRef=useRef(null)
const [images,setImagesUrl]=useState(null)
    const HandlePickImage=()=>{
    fileRef.current.click()
    }

const FetchImages=async ()=>{
    try {
        const docRef = doc(db, "program", ProgramID);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
            setImagesUrl(docSnap.data()?.images)
        } else {
            console.log("No such document!");
        }

    }catch (e) {
        console.log(e)
    }

}

    useEffect(() => {
        FetchImages().then()
    }, [ProgramID]);


    const UploadImage=async (e)=>{
        const image = e.target.files[0]
        const { data, error } = await supabase
            .storage
            .from('poducwest')
            .upload(image.name, image, {
                cacheControl: '3600',
                upsert: false
            })
        const { data:ImageUrl, error:ErrorUrl } =  supabase
            .storage
            .from('poducwest')
            .getPublicUrl(data?.path)

        if (!data.path) return
        if (!ImageUrl?.publicUrl) return
        if (error || ErrorUrl) return
        try {
            if (ImageUrl?.publicUrl) {
                await updateDoc(doc(db, "program", ProgramID), {
                    images: [...images,ImageUrl?.publicUrl]
                });

                FetchImages().then()
            }
       }catch (e) {
           console.log(e)
       }
    }
 const DeleteImage =async (index)=>{
     const filterImages = images?.filter((item, i) => i !== index);
     await updateDoc(doc(db, "program", ProgramID), {
         images: filterImages
     });
     FetchImages().then()
   }

    return (
<section className="flex  flex-col gap-5">


    <div>
        <Button size={"sm"} className="p-1" variant={"outlined"} color={"gray"} onClick={HandlePickImage}><PhotoIcon className={"w-5"}/></Button>
        <input ref={fileRef} type={"file"} onChange={(e)=>UploadImage(e)} className="hidden"/>
    </div>
    <div className="">
        <Masonry columns={{ 640: 1, 768: 2, 1024: 3, 1280: 3 }} gap={10}>
            {images?.map((url,index) => {
                return <div className="relative overflow-hidden rounded-lg group">
                    <img src={url} alt="" className=" rounded-lg"/>
                    <div className="hidden group-hover:block absolute top-0 w-full h-full bg-black/60"></div>
                     <button onClick={()=>DeleteImage(index)} className="hidden  group-hover:block  absolute top-3 right-3"><TrashIcon className={"w-5 text-white hover:text-red-400"}/></button>
                </div>
                    })}
                </Masonry>
    </div>
</section>
    );
}