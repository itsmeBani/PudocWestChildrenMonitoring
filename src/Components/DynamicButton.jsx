import React, {useState} from 'react';
import {Button} from "@material-tailwind/react";
import {CheckCircleIcon} from "@heroicons/react/24/solid";

function DynamicButton({onCLick,loading,success,title,color}) {

    return (
        <Button
            className="text-[10px] px-2 py-1 border"
            style={{ color: color, borderColor: "transparent" }}
            variant="outlined"
            loading={loading} // only loading, no need for success check
            onClick={onCLick}
        >
            {!loading && success ? (
                <CheckCircleIcon className="w-6" color={title === "Add" ? "green" : "red"} />
            ) :!loading && !success ? (
                title
                ) :null
            }
        </Button>
    );
}

export default DynamicButton;