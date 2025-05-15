import React, {createContext, useState} from "react";
import {malnutritionSchema} from "../Components/scheme.js";
import {addDoc, deleteDoc, updateDoc, collection, doc, serverTimestamp, setDoc} from "firebase/firestore";
import {db} from "../Firebase-config/firebase.js";
import useFetchByCategory from "../CustomHook/useFetchByCategory.js";
import {useBmi} from "../CustomHook/useBmi.js";

export const FormContext = createContext({})


export const FormProvider = ({children}) => {
    const {Result,Filter, setFilter,reload} = useFetchByCategory()
    const [open, setOpen] = React.useState(false);
    const [loading, setLoading] = useState(false)
    const {ranges,getBMIStatus} =useBmi()
    const [Error, setError] = useState(null)
    const initialValues = {
        firstName: "",
        lastName: "",
        caregiver: "",
        purok: 0,
        birthdate: "",
        sex: "",
        weight: 0,
        height: 0
    }
    const [recentStatus,setRecentStatus]=useState()


    const [formData, setFormData] = useState(initialValues);
    const [isUpdating, setisUpdating] = useState(null)
    const OpenModal = () => {
        setisUpdating(false)
        setFormData(initialValues)
        setOpen(true)
    };
    const CloseModal = () => {
        setRecentStatus(null)
        setOpen(false)
    }
    const handleChange = (value, name) => {
        setFormData((prevState) => ({
            ...prevState,
            [name]: value,
        }));
    };
    const ChangeStatus=(data,recentStatus)=>{
        const METER_IN_HEIGHT=data?.height/100
        let BMI = data?.weight / (METER_IN_HEIGHT * METER_IN_HEIGHT);
        let { status, color,txt } = getBMIStatus(BMI);

        return status !== recentStatus;

    }

    const SaveNewCases = async (e) => {
        e.preventDefault()
        console.log(formData)
        const result = malnutritionSchema.safeParse(formData);
        if (!result.success) {
            console.log(result.error.flatten().fieldErrors)
            setError(result.error.flatten().fieldErrors)
            return;
        }
        setError(null)
        setLoading(true)
        try {


            if (isUpdating && formData.id) {
                await updateDoc(doc(db, "children", formData.id), {...formData,lastUpdate:serverTimestamp(),});
                const StatusIsChange=ChangeStatus(formData,recentStatus)

                if (StatusIsChange){

                    const ref = collection(db, 'children', formData.id, 'history');
                    await addDoc(ref, {...formData,lastUpdate:serverTimestamp()});
                }

            } else {
                await addDoc(collection(db, "children"), {...formData,dateCreated:serverTimestamp()});

            }

            setFormData(initialValues)
            reload()
            CloseModal()

        } catch (e) {
            alert(e)
            console.log(e)
        }finally {
            setLoading(false)
        }

    };





    const EditCase = (data,recentStatus) => {
        setisUpdating(true)
        setFormData(data)
        setRecentStatus(recentStatus)
        setOpen(true)
    }

    const DeleteCases=async (id)=>{
        if (!id) return
        try {
            await deleteDoc(doc(db, "children", id));
            reload()
            console.log("Document deleted successfully!");
        } catch (error) {
            console.error("Error deleting document:", error);
        }
    }


 return (
        <FormContext.Provider value={{
            setFormData,
            CloseModal,
            EditCase,
            SaveNewCases,
            Error,
            Result,
            Filter,
            DeleteCases,
            setFilter,
            handleChange,
            formData,
            OpenModal,
            loading,
            open
        }}>
            {children}
        </FormContext.Provider>
    )


}