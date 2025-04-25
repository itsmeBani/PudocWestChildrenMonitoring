import React, {useEffect, useState} from 'react';
import {Input} from "@material-tailwind/react";
import {MagnifyingGlassIcon} from "@heroicons/react/24/outline/index.js";
import useDebounce from "../CustomHook/useDebounce.js";

function InputFilter({setData,options,data}) {

    const [search,setSearch]=useState("")
    const debouncedSearchTerm = useDebounce(search, 500);
    useEffect(() => {
        if (!debouncedSearchTerm) {
            setData(data);
        } else {
            setData(options(search,data));
        }
    }, [debouncedSearchTerm,data]);

    return (
        <div className=" md:w-72">
            <Input
                label="Search"
                onChange={(e)=>setSearch(e.target.value)}
                icon={<MagnifyingGlassIcon className="h-5 w-5"/>}
            />
        </div>
    );
}

export default InputFilter;