import React from 'react';
import { RiSearch2Line } from "react-icons/ri";

const SearchBar = () => {
    return (
        <div className=' mt-6 mb-6 w-full rounded-md border  flex items-center overflow-hidden bg-opacity-0 border-opacity-25 border-primary-2'>
            <div className=' w-10 h-full flex items-center justify-center'>
                <RiSearch2Line/>
            </div>
            <input className=' outline-none bg-opacity-0   bg-white w-full border-none h-9' type="text" placeholder='Search' />
        </div>
    );
};

export default SearchBar;