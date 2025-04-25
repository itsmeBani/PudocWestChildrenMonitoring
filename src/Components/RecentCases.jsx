import React from 'react';
import {Avatar, Chip, List, ListItem, ListItemPrefix, Typography} from "@material-tailwind/react";

function RecentCases({getRecentCases}) {
    return (
        <div className={"h-full"}>

            <div className={"px-5 pt-5"}>
                <Typography className="  text-lg text-[20px]  text-gray-700  font-bold leading-1" variant="p">Recently
                    Malnourished </Typography>
                <Typography className="text-[14px] leading-[12px] text-gray-700">Child with recent signs of poor
                    nutrition</Typography>
            </div>
                <List>
                    {getRecentCases?.map((item, j) => {
                        return(
                            <ListItem className=" py-0 md:py-1.5 px-2 ">
                                <div className="flex justify-between w-full place-items-center ">
                                  <div>
                                      <Typography variant="h6" color="blue-gray" className="text-slate-700">
                                          {item.firstName +" "+ item?.lastName}
                                      </Typography>
                                      <Typography variant="small" color="gray" className="font-normal  leading-[12px] text-[12px]">
                                          {item?.dateCreated && item.dateCreated.toDate().toLocaleDateString('en-US', {
                                              day: 'numeric',
                                              month: 'long',
                                              year: 'numeric'
                                          })}

                                      </Typography>
                                  </div>
                                 <div className="flex flex-col gap-2">
                                     <Typography variant="small" color="gray" className="font-normal">
                                         Purok {item?.purok}
                                     </Typography>
                                     <Chip className="text-[9px] rounded-unset"
                                         size="sm"
                                         variant="ghost"
                                         value={"normal"}
                                         color={"yellow"}
                                     />
                                 </div>

                                </div>
                            </ListItem>
                        )
                    })}
                </List>
        </div>
    );
}

export default RecentCases;