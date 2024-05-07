import React from 'react';
import Signup from '@/components/molecules/Signup';
const pages = () => {
    return (
        <div className=' absolute w-full h-full left-0 bg-background1 flex items-center justify-center'>
                <div className=' bg-background2 w-80 rounded-md shadow-sm p-5 flex items-center justify-between relative'>
                    <Signup/>
                </div>
        </div>
    );
};

export default pages;