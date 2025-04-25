import React, {use, useContext, useState} from "react";
import {
    List,
    Card,
    Alert,
    Avatar,
    ListItem,
    Accordion,
    Typography,
    AccordionBody,
    ListItemPrefix,
    AccordionHeader, Drawer, IconButton, Button,
} from "@material-tailwind/react";
import {
    TicketIcon,
    UserGroupIcon,
    Square2StackIcon,
    RectangleGroupIcon,
    ChatBubbleLeftEllipsisIcon, MapIcon, UserCircleIcon, Bars3BottomLeftIcon,
} from "@heroicons/react/24/solid";
import {
    ChevronDownIcon,
    ArrowLeftStartOnRectangleIcon,
} from "@heroicons/react/24/outline";
import {Link, NavLink} from "react-router-dom";
import {AuthProviderContext} from "../Context/AuthProvider.jsx";
import {getAuth} from "firebase/auth";
import {rangeContainsModifiers} from "react-day-picker";

function SidebarLight() {

    const {Logout, User} = useContext(AuthProviderContext)
    const [open, setOpen] = React.useState(0);
    const auth = getAuth();
    const handleOpen = (value) => {
        setOpen(open === value ? 0 : value);
    };

    const LIST_ITEM_STYLES =
        "select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900";

    return (
        <Card className="h-screen bg-unset bg-[#eaf0f9] w-full max-w-[50rem] mx-auto p-5 shadow-md">
            <div className="mb-2 flex items-center gap-4 p-4">
                <img
                    src="https://www.material-tailwind.com/logos/mt-logo.png"
                    alt="brand"
                    className="h-10 w-10"
                />
                <Typography color="blue-gray" className="text-lg font-bold">
                    Pudoc West
                </Typography>
            </div>

            <List>
                <Accordion open={open === 1}>
                    <ListItem
                        selected={open === 1}
                        data-selected={open === 1}
                        onClick={() => handleOpen(1)}
                        className="p-3 select-none hover:bg-gray-100 focus:bg-gray-100 active:bg-gray-100 hover:text-gray-900 focus:text-gray-900 active:text-gray-900 data-[selected=true]:text-gray-900"
                    >
                        <ListItemPrefix>
                            <Avatar
                                size="sm"
                                src={User?.photoURL && User?.photoURL}
                            />
                        </ListItemPrefix>
                        <Typography className="mr-auto font-normal text-inherit">
                            {auth.currentUser.displayName}
                        </Typography>
                        <ChevronDownIcon
                            strokeWidth={3}
                            className={`ml-auto h-4 w-4 text-gray-500 transition-transform ${open === 1 ? "rotate-180" : ""}`}
                        />
                    </ListItem>
                    <AccordionBody className="py-1">
                        <List className="p-0">
                            <ListItem className={`px-16 ${LIST_ITEM_STYLES}`}>
                                <ListItemPrefix>
                                    <UserCircleIcon className="h-5 w-5"/>
                                </ListItemPrefix>
                                My Profile
                            </ListItem>
                        </List>
                    </AccordionBody>
                </Accordion>
                <NavLink to={"/"}>
                    <ListItem className={LIST_ITEM_STYLES}>
                        <ListItemPrefix>
                            <RectangleGroupIcon className="h-5 w-5"/>
                        </ListItemPrefix>
                        Dashboard
                    </ListItem>
                </NavLink>
                <Link to={"/children"}>
                    <ListItem className={LIST_ITEM_STYLES}>
                        <ListItemPrefix>
                            <UserGroupIcon className="h-5 w-5"/>
                        </ListItemPrefix>
                        Children
                    </ListItem>
                </Link>
                <Link to={"/programs"}>
                    <ListItem className={LIST_ITEM_STYLES}>
                        <ListItemPrefix>
                            <MapIcon className="h-5 w-5"/>
                        </ListItemPrefix>
                        Programs
                    </ListItem>
                </Link>


            </List>
            <hr className="my-2 border-gray-200"/>
            <List>

                <ListItem onClick={Logout} className="hover:text-red-600">
                    <ListItemPrefix>
                        <ArrowLeftStartOnRectangleIcon
                            strokeWidth={2.5}
                            className="h-5 w-5"
                        />
                    </ListItemPrefix>
                    Sign Out
                </ListItem>
            </List>
        </Card>
    );
}

export function Sidebar() {
    return (
        <section className="h-full">
            <div className="  md:hidden">
                <ResponsiveNavbar>
                    <SidebarLight/>
                </ResponsiveNavbar>
            </div>
            <div className="h-ful hidden md:block">
                <SidebarLight/>
            </div>
        </section>
    );
}


const ResponsiveNavbar = ({children}) => {

    const [open,setOpen]=useState(false)
    return (
        <section className="pl-2 pt-2  pb-3  ">

            <Button variant={"outlined"} className={"p-1 border-none shadow-md"}   onClick={()=>setOpen(!open)}><Bars3BottomLeftIcon  className={"w-7 text-[#212121] "}/></Button>
            <Drawer    overlay={true} onClose={()=>setOpen(false)} open={open}  className="overflow-hidden ">
                {children}
            </Drawer>
        </section>
    )
}


export default Sidebar;