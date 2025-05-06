import React, {useContext} from 'react';
import {Cog6ToothIcon, UserGroupIcon} from "@heroicons/react/24/outline";
// import {ProgramModal} from "./ProgramModal.jsx";
import {ProgramContext} from "../Context/ProgramContext.jsx";
import {Button, Menu, MenuHandler, MenuItem, MenuList, Switch} from "@material-tailwind/react";
import {PencilIcon, PencilSquareIcon, TrashIcon} from "@heroicons/react/24/solid";

function ProgramCard({data, onClick, onDelete}) {

    return (
        <div>
            <div className="flex h-full flex-col">
                <div className="bg-white relative h-full shadow-md rounded-lg md:rounded-2xl p-3 pb-2 md:p-4">
                    <div className=" h-full flex lg:flex justify-between  flex-col">

                        <div className="flex flex-col justify-between gap-1 ml-3  h-full     ">
                            <div className="flex flex-wrap ">
                                <div className="w-full flex-none text-sm text-blue-700 font-medium ">
                                     Program
                                </div>
                                <h2 className="flex-auto text-[14px] md:text-lg font-normal md:leading-[24px] md:font-bold">{data?.programName}</h2>
                            </div>

                            <div className="grid grid-cols-1  flex-col md:grid-cols-2 text-sm text-gray-600">
                                <div className="flex-1 inline-flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z">
                                        </path>
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"></path>
                                    </svg>
                                    <p className="text-[11px] md:text-sm mr-1 md:mr-2">Pudoct West</p>
                                </div>
                                <div className="flex-1 inline-flex items-center">
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none"
                                         viewBox="0 0 24 24" stroke="currentColor">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2"
                                              d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"></path>
                                    </svg>
                                    <p className="text-[11px] md:text-sm mr-1 md:mr-2">05-25-2021</p>

                                </div>
                                <div className="flex-1 text-gray-600  text-sm inline-flex items-center">
                                    <UserGroupIcon className="h-4 mr-1"/>
                                    <p className="text-[11px] md:text-sm mr-1 md:mr-2">{data.collection?.length} Participants</p>
                                </div>

                            </div>


                            <div
                                className="flex   justify-center place-items-center md:justify-end pt-2  md:pt-4 gap-1 text-sm font-medium">
                                <button onClick={() => onClick("gallery", data?.id)}
                                        className="mb-2 text-[10px] w-full md:w-auto md:mb-0 bg-gray-900 md:px-5  px-4 py-1  md:py-2 shadow-sm tracking-wider text-white rounded-full  hover:bg-gray-800"
                                        type="button" aria-label="like">Gallery
                                </button>
                                <button onClick={() => onClick("manage", data?.id)}
                                        className="mb-2 text-[10px] w-full md:w-auto md:mb-0 bg-gray-900 md:px-5  px-4 py-1  md:py-2 shadow-sm tracking-wider text-white rounded-full  hover:bg-gray-800"
                                        type="button" aria-label="like">Manage
                                </button>

                            </div>


                            <div className="absolute top-3.5 right-3.5">


                                <Menu placement={"left-start"}
                                      dismiss={{
                                          itemPress: false,
                                      }}
                                >
                                    <MenuHandler>
                                        <Cog6ToothIcon color={"rgba(69,69,69,0.86)"} className="w-6"/>

                                    </MenuHandler>
                                    <MenuList className={"hover:text-red p-2 overflow-hidden"}>
                                        <MenuItem onClick={() => onDelete(data?.id)}
                                                  className="flex p-1 place-items-center hover:text-red-300 h-full gap-2 text-red-400"><TrashIcon
                                            className="w-5 " color="light-red"/> Delete</MenuItem>
                                        <MenuItem><Switch   checked={data?.finished} color={"blue"} label={"Finished"}/></MenuItem>
                                    </MenuList>

                                </Menu>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
}

export default ProgramCard;