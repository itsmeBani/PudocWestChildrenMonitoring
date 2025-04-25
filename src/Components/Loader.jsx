import React from 'react';


function Loader(props) {
    return (
        <div className="flex-1 place-items-center justify-center pt-20 h-full flex">
         <div className="  place-items-center flex flex-col ">
             <div className="w-10 h-10 border-4  top-[70%] top-0  border-t-blue-500 border-gray-300 rounded-full animate-spin"/>
         </div>
        </div>
    );
}

export default Loader;