import React, {useEffect, useState} from 'react';
import {Chip, Typography} from "@material-tailwind/react";
import useFetchByCategory from "../CustomHook/useFetchByCategory.js";
import {
    Accordion,
    AccordionHeader,
    AccordionBody,
} from "@material-tailwind/react";
import {
    Timeline,
    TimelineItem,
    TimelineConnector,
    TimelineIcon,

    TimelineHeader,
} from "@material-tailwind/react";
import {ArchiveBoxIcon, BellIcon, CurrencyDollarIcon} from "@heroicons/react/16/solid/index.js";
import {useBmi} from "../CustomHook/useBmi.js";
import EmptyState from "../Components/EmptyState.jsx";
import InputFilter from "../Components/InputFilter.jsx";

function History(props) {
    const [open, setOpen] = React.useState(null);
    const handleOpen = (value) => setOpen(open === value ? null : value);

    const {Result} = useFetchByCategory()
    console.log(Result)
    const {getBMIStatus} = useBmi()
    const [ChildrenList, setChildrenList] = useState([])


    const options = (search, data) => data?.filter(item =>
        item?.lastName?.toLowerCase().includes(search.toLowerCase()) |
        item?.firstName?.toLowerCase().includes(search.toLowerCase()) |
        item?.caregiver?.toLowerCase().includes(search.toLowerCase())
    );
    return (
        <section className="p-5 h-full p-3 w-full ">
            <div className="w-full h-full p-3 bg-white overflow-y-auto rounded-2xl p-7">


                <Typography variant="h5" color="blue-gray">
                    Child Case History
                </Typography>
                <Typography color="gray" className="mt-1 font-normal">
                    Review recent case records and history of identified children.
                </Typography>
                <div className="p-5 w-full justify-end place-items-end">
                    <InputFilter data={Result} setData={setChildrenList} options={options}/>
                </div>
                <>

                    {ChildrenList ? ChildrenList.map((item, index) => {
                        return (
                            <Accordion open={open === index}>
                                <AccordionHeader className={"text-sm"} onClick={() => handleOpen(index)}>
                                    {item.firstName} {item.lastName}
                                </AccordionHeader>
                                <AccordionBody>
                                    <ol className="grid grid-cols-3">
                                        {item?.collection.length > 0 ? item?.collection.map((data, index) => {

                                            const METER_IN_HEIGHT = data.height / 100
                                            let BMI = data.weight / (METER_IN_HEIGHT * METER_IN_HEIGHT);


                                            let {status, color, txt} = getBMIStatus(BMI);


                                            return (
                                                <li className="relative">
                                                    <div className="flex items-center  ">
                                                        <div
                                                            className={"  rounded-full flex place-items-center  h-[35px]"}>
                                                            <svg className="w-4 h-4 text-indigo-800 dark:text-blue-300"
                                                                 aria-hidden="true" xmlns="http://www.w3.org/2000/svg"
                                                                 fill="currentColor" viewBox="0 0 20 20">
                                                                <path
                                                                    d="M20 4a2 2 0 0 0-2-2h-2V1a1 1 0 0 0-2 0v1h-3V1a1 1 0 0 0-2 0v1H6V1a1 1 0 0 0-2 0v1H2a2 2 0 0 0-2 2v2h20V4ZM0 18a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V8H0v10Zm5-8h10a1 1 0 0 1 0 2H5a1 1 0 0 1 0-2Z"/>
                                                            </svg>
                                                        </div>
                                                        {index !== item?.collection?.length - 1 && <div
                                                            className="hidden  sm:flex w-full  bg-gray-200 h-0.5 dark:bg-gray-700"/>}
                                                    </div>
                                                    <div className="mt-3 sm:pe-8">
                                                        <time
                                                            className="block mb-2 text-[12px] font-normal leading-none text-black/75 dark:text-gray-500">

                                                         <span className="font-thin ">Date Edited :</span> {data?.lastUpdate.toDate().toLocaleDateString('en-US', {
                                                                year: 'numeric',
                                                                month: 'long',
                                                                day: 'numeric',
                                                                hour: 'numeric',
                                                                minute: '2-digit',
                                                                hour12: true,
                                                            })}
                                                        </time>
                                                        <Typography
                                                            className="text-base flex place-items-start gap-2 font-normal flex flex-col dark:text-gray-400">
                                                            Based on their current
                                                            measurements, {item.firstName} {item.lastName} is classified
                                                            as{" "}
                                                            <Chip
                                                                className="font-semibold text-[11px]  px-2 py-0"
                                                                value={status}
                                                                color={color}
                                                                variant="ghost"
                                                            />
                                                        </Typography>
                                                        <Typography
                                                            className="text-[13px] mt-2 flex place-items-start gap-2 font-normal flex flex-col dark:text-gray-400">
                                                        Recent Height: {data?.height}cm
                                                        </Typography>
                                                        <Typography
                                                            className="text-[13px]  flex place-items-start gap-2 font-normal flex flex-col dark:text-gray-400">
                                                            Recent Weight: {data?.weight}kg
                                                        </Typography>
                                                    </div>
                                                </li>


                                            )
                                        }) : <EmptyState/>}
                                    </ol>
                                </AccordionBody>
                            </Accordion>
                        )
                    }) : <EmptyState/>}
                </>
            </div>

        </section>
    );
}

export default History;
