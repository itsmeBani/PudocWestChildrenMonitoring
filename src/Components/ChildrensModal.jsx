import React, {useContext, useState} from "react";
import {
    Input,
    Option,
    Select,
    Button,
    Dialog,
    IconButton,
    Typography,
    DialogBody,
    DialogHeader,
    DialogFooter,
} from "@material-tailwind/react";
import {ExclamationCircleIcon, XMarkIcon} from "@heroicons/react/24/outline";
import {FormContext} from "../Context/FormContext.jsx";

export function ChildrenModal() {
    const {SaveNewCases,Error,handleChange,formData,OpenModal,loading,open,CloseModal, setActiveFilter} =useContext(FormContext)
    return (
        <Dialog size="md" open={open} handler={CloseModal} className="p-4">
            <DialogHeader className="relative m-0 block">
                <Typography className="font-bold" variant="h4" color="blue-gray">
                    Malnutrition Case
                </Typography>
                <Typography className="mt-0 font-normal text-gray-600">
                    Fill out the form to register a child with malnutrition for proper monitoring and care.
                </Typography>
                <IconButton
                    size="sm"
                    variant="text"
                    className="!absolute right-3.5 top-3.5"
                    onClick={CloseModal}
                >
                    <XMarkIcon className="h-4 w-4 stroke-2"/>
                </IconButton>
            </DialogHeader>
            <DialogBody>
                <form className="space-y-4"  onSubmit={SaveNewCases}>
                    {/* Full Name of Child */}
                    <div className="flex gap-4">
                    <div className="w-full">
                        <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                            First Name
                        </Typography>
                        <Input
                            color="gray"
                            size="lg"
                            placeholder="eg. john doe dela cruz"

                            value={formData.firstName}
                            onChange={(e) => handleChange(e.target.value, "firstName")}
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            containerProps={{
                                className: "!min-w-full",
                            }}
                            labelProps={{
                                className: "hidden",
                            }}
                        />
                    </div>
                        <div className="w-full">
                        <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                            Last Name
                        </Typography>
                        <Input
                            color="gray"
                            size="lg"
                            placeholder="eg. john doe dela cruz"

                            value={formData.lastName}
                            onChange={(e) => handleChange(e.target.value, "lastName")}
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            containerProps={{
                                className: "!min-w-full",
                            }}
                            labelProps={{
                                className: "hidden",
                            }}
                        />
                    </div>
                </div>
                    {/* Caregiver Name */}
                    <div>
                        <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                            Name of Caregiver
                        </Typography>
                        <Input
                            color="gray"
                            size="lg"
                            placeholder="eg. Marites dela cruz"

                            value={formData.caregiver}
                            onChange={(e) => handleChange(e.target.value, "caregiver")}
                            className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                            containerProps={{
                                className: "!min-w-full",
                            }}
                            labelProps={{
                                className: "hidden",
                            }}
                        />
                    </div>

                    {/* Purok */}
                    <div>
                        <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                            Purok
                        </Typography>
                        <Select
                            labelProps={{
                                className: "hidden",
                            }}

                            value={formData.purok}

                            onChange={(e) => handleChange(e, "purok")}

                            className="!w-full h-11 !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-blue-gray-900 group-hover:!border-primary"
                        >
                            <Option className="mb-2" value={1}>
                                Purok 1
                            </Option>
                            <Option className="mb-2" value={2}>
                                Purok 2
                            </Option>
                            <Option className="mb-2" value={3}>
                                Purok 3
                            </Option>
                            <Option className="mb-2" value={4}>
                                Purok 4
                            </Option>
                        </Select>
                    </div>

                    {/* Date of Birth */}
                    <div className="flex gap-4">
                        <div className="w-full">
                            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                                Date of Birth
                            </Typography>
                            <Input
                                color="gray"
                                type="date"
                                size="lg"
                                placeholder="eg. 01/01/2000"

                                value={formData.birthdate}
                                onChange={(e) => handleChange(e.target.value, "birthdate")}

                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                containerProps={{
                                    className: "!min-w-full",
                                }}
                                labelProps={{
                                    className: "hidden",
                                }}
                            />
                        </div>

                        {/* Sex */}
                        <div className="w-full">
                            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                                Sex
                            </Typography>
                            <Select
                                labelProps={{
                                    className: "hidden",
                                }}
                                name="sex"
                                value={formData.sex}
                                onChange={(e) => handleChange(e, "sex")}
                                className="min-w-[0px] h-11 !border-blue-gray-200/90 !border-t-blue-gray-200/90 bg-white text-gray-800 ring-4 ring-transparent placeholder:text-gray-600 focus:!border-primary focus:!border-blue-gray-900 group-hover:!border-primary"
                            >
                                <Option className="mb-2" value="Male">
                                    Male
                                </Option>
                                <Option value="Female">Female</Option>
                            </Select>
                        </div>
                    </div>

                    {/* Weight */}
                    <div className="flex gap-4">
                        <div className="w-full">
                            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                                Weight(Kg)
                            </Typography>
                            <Input
                                color="gray"
                                size="lg"
                                placeholder="eg. 40"

                                value={formData.weight}
                                onChange={(e) => handleChange(e.target.value, "weight")}
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                containerProps={{
                                    className: "!min-w-full",
                                }}
                                labelProps={{
                                    className: "hidden",
                                }}
                            />
                        </div>
                        <div className="w-full">
                            <Typography variant="small" color="blue-gray" className="mb-2 text-left font-medium">
                                Height(cm)
                            </Typography>
                            <Input
                                color="gray"
                                size="lg"
                                placeholder="eg. 150"
                                value={formData.height}
                                onChange={(e) => handleChange(e.target.value, "height")}
                                className="!border-t-blue-gray-200 focus:!border-t-gray-900"
                                containerProps={{
                                    className: "!min-w-full",
                                }}
                                labelProps={{
                                    className: "hidden",
                                }}
                            />
                        </div>
                    </div>

                    {/* Save Button */}
                    <DialogFooter>
                        {Error && (
                            <Typography
                                variant="paragraph"
                                color="red"
                                className="text-[13px] flex gap-2 font-thin"
                            >
                                <ExclamationCircleIcon className={"w-5 h-5 "}/>
                                Please fill all fields correctly
                            </Typography>
                        )}
                        <Button  disabled={loading&&loading} loading={loading && loading} color="green" type="submit" className="ml-auto">
                            Save
                        </Button>
                    </DialogFooter>
                </form>
            </DialogBody>
        </Dialog>
    );
}
