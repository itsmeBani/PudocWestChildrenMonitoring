import {PencilIcon, UserGroupIcon} from "@heroicons/react/24/solid";
import {
    ArrowDownTrayIcon,
    MagnifyingGlassIcon,
} from "@heroicons/react/24/outline";
import {
    Card,
    CardHeader,
    Typography,
    Button,
    CardBody,
    Chip,
    CardFooter,
    Avatar,
    IconButton,
    Tooltip,
    Input,
} from "@material-tailwind/react";
import React from "react";
import useFetchPrograms from "../CustomHook/useFetchPrograms.js";

const TABLE_HEAD = ["Program", "Participant", "Date", "Status",];

export function RecentPrograms() {
const {ProgramData} = useFetchPrograms()

    return (
        <Card className="h-full w-full flex">
            <div  className="rounded-none flex">

                        <div className="flex px-4 pt-3 pb-2 flex-col">
                            <Typography className="text-lg text-[20px] font-bold leading-1" variant="p">
                                Recent Programs in Pudoc West
                            </Typography>
                            <Typography className="text-[14px] leading-[20px] text-gray-700">
                                This effort aims to improve community involvement and promote better nutrition for children.
                            </Typography>
                        </div>
            </div>

            <CardBody className="overflow-y-scroll pt-0 p-0">
                <table className="w-full min-w-max table-auto text-left">
                    <thead>
                    <tr>
                        {TABLE_HEAD.map((head) => (
                            <th
                                key={head}
                                className="border-y border-blue-gray-100 bg-blue-gray-50/50 pl-4 p-2"
                            >
                                <Typography
                                    variant="small"
                                    color="blue-gray"
                                    className="font-normal leading-none opacity-70"
                                >
                                    {head}
                                </Typography>
                            </th>
                        ))}
                    </tr>
                    </thead>
                    <tbody>
                    {ProgramData?.map((prog,index) => {
                            const isLast = index === ProgramData.length - 1;
                            const classes = isLast
                                ? "p-2 pl-4 "
                                : "p-2 pl-4  border-b border-blue-gray-50";

                            return (
                                <tr key={prog?.id}>
                                    <td className={classes}>
                                        <div className="flex items-center gap-3">

                                            <Typography
                                                variant="small"
                                                color="blue-gray"
                                                className="font-bold"
                                            >
                                                {prog?.programName}
                                            </Typography>
                                        </div>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal gap-1 place-items-center text-slate-700 flex"
                                        >
                                           <UserGroupIcon className="h-4 w-4  text-slate-700"/> {prog?.collection.length}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <Typography
                                            variant="small"
                                            color="blue-gray"
                                            className="font-normal"
                                        >
                                            {prog?.date}
                                        </Typography>
                                    </td>
                                    <td className={classes}>
                                        <div className="w-max">
                                            <Chip className={"text-[10px] "}
                                                size="sm"
                                                variant="ghost"
                                                value={"Finished"}
                                                color={"green"}
                                                    // status === "Finished"
                                                    //     ? "green"
                                                    //     : status === "Ongoing" ? "yellow" :"red"

                                            />
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