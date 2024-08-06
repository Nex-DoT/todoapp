'use client'
import React from 'react';
import { useState } from 'react';
import Signup from '@/components/molecules/Signup';
import Login from '@/components/molecules/Login';
const Pages = () => {
    const [login ,setLogin] = useState(false);
    const changeHandeler = ()=>{
        setLogin(!login);
    }

    return (
        <div className=' absolute w-full h-full left-0 bg-background1 flex items-center justify-center z-30'>
                <div className=' bg-background2 w-80 rounded-md shadow-sm p-5 flex items-center justify-between relative'>
                    {login ?  <Login onclick={changeHandeler}/> : <Signup onclick={changeHandeler}/>}
                </div>
        </div>
    );
};

export default Pages;