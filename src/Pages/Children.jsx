import React, {useContext, useEffect, useRef, useState} from 'react';

import {ChildrenModal} from "../Components/ChildrensModal.jsx";
import {
    MagnifyingGlassIcon,
    ChevronUpDownIcon,
} from "@heroicons/react/24/outline";
import {AdjustmentsHorizontalIcon, PencilIcon, TrashIcon, UserPlusIcon} from "@heroicons/react/24/solid";
import {
    Card,
    CardHeader,
    Input,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Tabs,
    TabsHeader,
    Tab,
    Avatar,
    IconButton,
    Tooltip, Select, Option, Menu, MenuHandler, MenuItem, MenuList, tab,
} from "@material-tailwind/react";
import {malnutritionSchema} from "../Components/scheme.js";
import {db} from "../Firebase-config/firebase.js";

const TABS = [
    {
        label: "All",
        value: null,
    },
    {
        label: "Purok 1",
        value: 1,
    },
    {
        label: "Purok 2",
        value: 2,
    },
    {
        label: "Purok 3",
        value: 3,
    },
    {
        label: "Purok 4",
        value: 4,
    },
];
import {collection, addDoc} from "firebase/firestore";
import {FormContext} from "../Context/FormContext.jsx";
import useDebounce from "../CustomHook/useDebounce.js";
import InputFilter from "../Components/InputFilter.jsx";
import {useBmi} from "../CustomHook/useBmi.js";

const TABLE_HEAD = ["Full name of Child", "Name of the Caregiver", "sex", "weight", "height", "Age","status", "Action"];


function Children(props) {
    const {OpenModal, DeleteCases, Filter, setFilter, EditCase, Result} = useContext(FormContext)


    const FilterCategory = (purok) => {
        setFilter(purok)
    }
    const [ChildrenList,setChildrenList]=useState([])


    const  options =(search,data)=> data?.filter(item =>
        item?.lastName?.toLowerCase().includes(search.toLowerCase()) |
        item?.firstName?.toLowerCase().includes(search.toLowerCase()) |
        item?.caregiver?.toLowerCase().includes(search.toLowerCase())
    );

    const {ranges,getBMIStatus} =useBmi()




    return (


        <section className="p-5 flex-1">

            <Card className=" bg-white rounded-xl flex flex-col p-5  h-full w-full">
                <ChildrenModal/>

                <CardHeader floated={false} shadow={false} className="rounded-none">
                    <div className="mb-2 flex items-center justify-between gap-8">
                        <div>
                            <Typography variant="h5" color="blue-gray">
                                Malnourished Children
                            </Typography>
                            <Typography color="gray" className="mt-1 font-normal">
                                View details of recently identified cases
                            </Typography>

                        </div>
                        <div className="flex shrink-0 flex-col gap-2 sm:flex-row">
                            <button  onClick={OpenModal}
                                className="bg-indigo-600 flex place-items-center gap-1  px-5 py-2 text-sm shadow-sm font-semibold tracking-wider text-white rounded-full hover:bg-gray-800">
                                <UserPlusIcon strokeWidth={2} className="h-4 w-4"/> New
                            </button>
                        </div>

                    </div>

                    <div className="grid grid-cols-3 mb-2">

                        {ranges.map((item,index)=>{

                            return <div className="flex  gap-1"><Chip value={null}  color={item?.color} className="mt-1 w-[12px] px-0 h-[10px]  rounded-lg"   /><p className="text-[13px]">{item?.status}</p></div>
                        })}



                    </div>
                    <div className="flex flex-col  items-center justify-between gap-4 md:flex-row">
                        <div className="w-full flex gap-2">
                            <Menu placement={"bottom-start"}>
                                <MenuHandler>

                                    <Button variant={"outlined"} color={"black"}
                                            className="text-[10px] focus:shadow-none place-items-center gap-2 flex  px-2 py-2">
                                        <AdjustmentsHorizontalIcon className="h-4 w-5 "/>{Filter && "Purok " + Filter}
                                    </Button>
                                </MenuHandler>
                                <MenuList>
                                    {TABS?.map((value, index, array) => {
                                        return <MenuItem onClick={() => FilterCategory(value.value)}
                                                         key={index}>{value.label}</MenuItem>
                                    })}
                                </MenuList>
                            </Menu>

                        </div>
                       <InputFilter data={Result} setData={setChildrenList} options={options}/>
                    </div>
                </CardHeader>
                <div className=" px-0">
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
                                        className="flex items-center capitalize justify-between gap-2 font-normal leading-none opacity-70"
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
                        <tbody>
                        {ChildrenList?.map(
                            (data, index) => {


                                const {firstName, id, lastName, caregiver, height, weight, sex, purok, birthdate} = data
                                const isLast = index === Result.length - 1;
                                const classes = isLast
                                    ? "p-2 max-w-[100px] min-w-[100px]"
                                    : "p-2 border-b-[2px] max-w-[100px] min-w-[100px]  text-start border-blue-gray-50";

                                let ageInYears = new Date().getFullYear() - new Date(birthdate).getFullYear();
                                if (new Date().getMonth() < new Date(birthdate).getMonth() || (new Date().getMonth() === new Date(birthdate).getMonth() && new Date().getDate() < new Date(birthdate).getDate())) {
                                    ageInYears--;
                                }
                                const METER_IN_HEIGHT=height/100
                                let BMI = weight / (METER_IN_HEIGHT * METER_IN_HEIGHT);


                                let { status, color,txt } = getBMIStatus(BMI);

                                return (
                                    <tr key={index}>
                                        <td className={classes}>
                                            <div className="flex items-center gap-3">
                                                <div className="flex flex-col">
                                                    <Typography
                                                        variant="small"
                                                        color="blue-gray"
                                                        className="font-normal capitalize"
                                                    >
                                                        {firstName + " "+ lastName}
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
                                                    {caregiver}
                                                </Typography>

                                            </div>
                                        </td>

                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal "
                                            >
                                                {sex}
                                            </Typography>
                                        </td>

                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {weight}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >
                                                {height}
                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-normal"
                                            >{ageInYears}

                                            </Typography>
                                        </td>
                                        <td className={classes}>
                                            <div className="flex justify-center">
                                                <Chip variant={"ghost"} color={color} className=" text-center text-[10px]" value={txt} />
                                            </div>
                                        </td>
                                        <td className={"w-full flex p-2 gap-2"}>
                                            <Tooltip className="bg-indigo-700" content="Edit">
                                                <IconButton onClick={() => EditCase(data)} className="" size={'sm'}
                                                            color={"indigo"}>
                                                    <PencilIcon className="h-4 w-4"/>
                                                </IconButton>
                                            </Tooltip>
                                            <Tooltip className="bg-red-500" content="Delete">
                                                <IconButton onClick={() => DeleteCases(id)} size={'sm'} color={"red"}>
                                                    <TrashIcon className="h-4 w-4"/>
                                                </IconButton>
                                            </Tooltip>

                                        </td>
                                    </tr>
                                );
                            },
                        )}
                        </tbody>
                    </table>
                </div>
            </Card>
        </section>

    );
}

export default Children;

