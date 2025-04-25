import React from 'react';
import Map from "../Components/Map.jsx";
import {IconButton, Typography} from "@material-tailwind/react";
import {UserIcon, UsersIcon} from "@heroicons/react/16/solid/index.js";
import useFetchByCategory from "../CustomHook/useFetchByCategory.js";
import RecentCases from "../Components/RecentCases.jsx";
import {RecentPrograms} from "../Components/RecentPrograms.jsx";

function Dashboard(props) {
    const BarColor = [
        "rgb(223,109,109)",
        "rgba(161, 161, 255,1)",
        "rgb(105,188,109)",
        "rgba(36,36,239,0.84)"
    ];

    //Todo change this to hook
    const {Result, SetFilter, reload, getRecentCases} = useFetchByCategory()
    const Purok = Result?.reduce((groups, item) => {
        if (!groups[item.purok]) {
            groups[item.purok] = [];
        }
        groups[item.purok].push(item);
        return groups;
    }, {});

    const PurokCount = (Purok && Object.keys(Purok).length > 0)
        ? Object.keys(Purok).reduce((counts, key) => {
            counts[key] = Purok[key].length;
            return counts;
        }, {})
        : {};

    return (
        <section className="p-1 md:p-2  flex flex-col gap-2   w-full  ">
            <div className="grid gap-2 md:gap-3 md:grid-cols-4 grid-cols-2">
                {Array.from({length: 4}).map((i, j) =>
                    <div key={j}
                         className="md:px-5 md:py-3 py-3  px-3   bg-white  rounded-[12px] flex justify-between relative overflow-hidden">
                        <div>
                            <Typography className={"font-normal md:font-thin text-[12px] md:text-sm text-gray-800"}>Purok {j + 1}</Typography>
                            <Typography
                                className={"text-5xl font-bold text-gray-800"}>{PurokCount[j + 1] ? PurokCount[j + 1] : 0}</Typography>
                        </div>
                        <div>
                            <IconButton style={{backgroundColor: BarColor[j]}}><UserIcon className={"w-5 h-5"}/>
                            </IconButton>
                        </div>
                        <div style={{backgroundColor: BarColor[j]}} className={`absolute right-0 h-full top-0 w-2 `}/>
                    </div>
                )}


            </div>

            <div className="grid  gap-0 md:gap-2  md:grid-cols-3 grid-cols-1 w-full">
                <div
                    className={" col-span-2 gap-2 mb-2 md:mb-0  flex  flex-col w-full  bg-white h-[420px] overflow-hidden p-5 rounded-[12px]"}>
                    <div>
                        <Typography className="text-lg text-[20px]  text-gray-700  font-bold leading-1" variant="p">
                            Map of Pudoct West Area
                        </Typography>
                        <Typography className="text-[14px] leading-[20px] text-gray-700">
                            Covers Purok 1, Purok 2, Purok 3, and Purok 4 for better community insight.
                        </Typography>
                    </div>
                    <Map/>
                </div>

                <div className={"bg-white  relative  pb-2 md:pb-0  md:h-[420px] overflow-y-scroll  rounded-[12px]"}>
                    <RecentCases getRecentCases={getRecentCases}/>
                </div>
            </div>

            <div className="flex overflow-hidden h-full bg-white rounded-xl">
                <RecentPrograms/>
            </div>
        </section>
    );
}

export default Dashboard;