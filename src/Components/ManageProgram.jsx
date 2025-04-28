import React, {useEffect, useState} from "react";


import {ChevronUpDownIcon, MagnifyingGlassIcon,} from "@heroicons/react/24/outline";
import {CheckCircleIcon, UserGroupIcon} from "@heroicons/react/24/solid";
import {Button, Card, CardBody, DialogHeader, Input, Typography,} from "@material-tailwind/react";
import useFetchByCategory from "../CustomHook/useFetchByCategory.js";
import {deleteDoc, doc, setDoc} from "firebase/firestore";
import {db} from "../Firebase-config/firebase.js";
import useFetchPrograms from "../CustomHook/useFetchPrograms.js";
import DynamicButton from "./DynamicButton.jsx";
import EmptyState from "./EmptyState.jsx";
import InputFilter from "./InputFilter.jsx";
import Loader from "./Loader.jsx";


const TABLE_HEAD = ["Name", "Status", "Action"];


export function List({data, onClick, loading, Adding}) {
    const [_index, setIndex] = useState()
    const [listData,setListData]=useState([])
    const  options =(search,data)=> data?.filter(item =>
        item?.lastName?.toLowerCase().includes(search.toLowerCase()) |
        item?.firstName?.toLowerCase().includes(search.toLowerCase()) |
        item?.caregiver?.toLowerCase().includes(search.toLowerCase())
    );
// if (loading) return <div className="flex w-full "><Loader/></div>
 if(!data.length > 0) return <EmptyState message={Adding ? "All children have been added to this program" : "There are no participants at the moment"} />;

    return (
        <Card className="h-full w-full shadow-none pb-0 ">
          <div className={"flex w-full justify-end"}>
             <InputFilter options={options} data={data} setData={setListData}/>
          </div>
            <CardBody className="overflow-auto px-0 p-2">
                <table className="mt-4 w-full min-w-max table-auto text-left">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head, index) => (
                            <th
                                key={head}
                                className="cursor-pointer border-y border-blue-gray-100 bg-blue-gray-50/50 p-4 transition-colors hover:bg-blue-gray-50"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="flex items-center justify-between gap-2 font-normal leading-none opacity-70"
                                >
                                    {head}{" "}
                                    {index !== TABLE_HEAD.length - 1 && (
                                        <ChevronUpDownIcon strokeWidth={2} className="h-4 w-4"/>
                                    )}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody className="">
                    {listData?.map((data, index) => {
                            const isLast = index === data.length - 1;
                            const classes = isLast
                                ? "p-4"
                                : "p-4 border-b place-items-start border-blue-gray-50";

                            return (
                                <tr key={index}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">
                                            <div className="flex flex-col">
                                                <Typography
                                                    variant="small"
                                                    color="blue-gray"
                                                    className="font-normal"
                                                >
                                                    {data?.lastName + ", " + data?.firstName}
                                                </Typography>

                                            </div>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="flex flex-col">
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                Purok {data?.purok}
                                            </Typography>

                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <div className="w-max flex place-items-center text-center">
                                            {Adding ?
                                                <DynamicButton
                                                    title={"Add"}
                                                    color={"rgb(131,131,253)"}
                                                    success={_index === data.id && loading.doneAdding}
                                                    loading={_index === data.id && loading.adding}
                                                    onCLick={() => {
                                                        setIndex(data.id)
                                                        onClick(data)
                                                        const timeoutId = setTimeout(() => {
                                                            setIndex(null);
                                                        }, 1000);
                                                        return () => clearTimeout(timeoutId)
                                                    }}/>
                                                :
                                                <DynamicButton
                                                    title={"Remove"}
                                                    color={"rgb(255,55,55)"}
                                                    success={_index === data.id && loading.doneDeleting}
                                                    loading={_index === data.id && loading.deleting}
                                                    onCLick={() => {
                                                        setIndex(data.id)
                                                        onClick(data)
                                                        const timeoutId = setTimeout(() => {
                                                            setIndex(null);
                                                        }, 1000);
                                                        return () => clearTimeout(timeoutId)
                                                    }}
                                                />
                                            }


                                        </div>
                                    </td>

                                </tr>
                            );
                        },
                    )}
                    </tbody>
                </table>
            </CardBody>

        </Card>
    );
}


function ManageProgram({ProgramID}) {
    const {Result, Filter, SetFilter,isLoading} = useFetchByCategory()
    const [isAdding, setIsAdding] = useState(false)
    const {Reload, ListOfParticipants, setProgramID,loading:isLoadingProgram} = useFetchPrograms()
    const [loading, setLoading] = useState({
        id: "",
        adding: false,
        deleting: false,
        doneAdding: false,
        doneDeleting: false
    })


    const ToggleLoading = (obj) => {
        setLoading(prevState => ({
            ...prevState,
            ...obj,
        }));
    }

    const HandleAddingParticipants = async (data) => {
        if (!ProgramID) return;
        const ref = doc(db, 'program', ProgramID, 'participants', data?.id);
        try {

            ToggleLoading({adding: true})
            await setDoc(ref, data);
            ToggleLoading({doneAdding: true})
        } catch (error) {
            console.error('Error adding participant with setDoc:', error);
        } finally {
            ToggleLoading({adding: false})
            Reload()
        }
    };


    const HandleRemoveParticipant = async (data) => {
        if (!ProgramID) return;
        const ref = doc(db, 'program', ProgramID, 'participants', data?.id);

        try {
            ToggleLoading({deleting: true})
            await deleteDoc(ref);
            ToggleLoading({doneDeleting: true})
        } catch (error) {
            console.error('Error deleting participant:', error);
        } finally {
            ToggleLoading({deleting: false})
            Reload();
        }
    };


    useEffect(() => {
        setProgramID(ProgramID)
    }, [ProgramID])

    const ChildrenList = () => {
        const participants = ListOfParticipants || [];
        const result = Result || [];
        return [
            ...participants.filter(p => !result.some(r => r.id === p.id)),
            ...result.filter(r => !participants.some(p => p.id === r.id))
        ];
    };
    const ChildrenData = ChildrenList()
    return (
        <div className="w-full flex flex-col  h-full">
            <DialogHeader className="relative m-0 block">
                <Typography variant="h4" color="blueGray">
                    Participants
                </Typography>
                <Typography className="mt-1 font-normal text-gray-600">
                    Below is the comprehensive list of individuals who participated in this meaningful feeding program</Typography>
            </DialogHeader>
            <div className="rounded-none">
                <div className="mb-2 flex  w-full  ">
                    <div className="flex  flex-col justify-end w-full place-items-center gap-2 sm:flex-row">

                        <Button onClick={() => setIsAdding(!isAdding)} className="bg-indigo-600 flex items-center gap-3" size="sm">
                            <UserGroupIcon strokeWidth={2} className="h-4 w-4"/>
                            {
                                isAdding ? "View Participants" : "Add Participants"
                            }


                        </Button>
                    </div>
                </div>

            </div>
            {
                isAdding ?
                    <List Adding={true}
                          onClick={HandleAddingParticipants}
                          data={ChildrenData}
                          loading={loading}
                    /> :
                    <List Adding={false}
                          onClick={HandleRemoveParticipant}
                          loading={loading}
                          data={ListOfParticipants}

                    />
            }


            <div>
            </div>


        </div>
    );
}


export default ManageProgram;