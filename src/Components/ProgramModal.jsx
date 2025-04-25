import React, {useContext} from "react";
import {
    Button,
    Dialog,
    Checkbox,
    Typography,
    DialogBody,
    IconButton,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";
import { XMarkIcon } from "@heroicons/react/24/outline";
import {ProgramContext} from "../Context/ProgramContext.jsx";

export function ProgramModal({children,HandleCloseModal,HandleOpenModal,OpenModal}) {

    return (

            <Dialog  size={"md"}    open={OpenModal}  handler={HandleCloseModal} className="p-4 h-[97dvh] m-0 flex flex-col  ">
                <DialogHeader className="relative m-0 block">
                    <Typography variant="h4" color="blueGray">
                        Participants
                    </Typography>
                    <Typography className="mt-1 font-normal text-gray-600">
                        Below is the comprehensive list of individuals who participated in this meaningful feeding program</Typography>

                    <IconButton
                        size="sm"
                        variant="text"
                        className="!absolute right-3.5 top-3.5"
                        onClick={HandleCloseModal}
                    >
                        <XMarkIcon className="h-4 w-4 stroke-2" />
                    </IconButton>
                </DialogHeader>
                <DialogBody className="space-y-4  flex overflow-y-auto h-full  px-2">
                    {children}
                </DialogBody>

            </Dialog>

    );
}