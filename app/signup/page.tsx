'use client'
import React from 'react';
import { useState } from 'react';
import Signup from '@/components/molecules/Signup';
import Login from '@/components/molecules/Login';
const pages = () => {
    const [login ,setLogin] = useState(false);
    const changeHandeler = ()=>{
        setLogin(!login);
    }

    return (
        <div className=' absolute w-full h-full left-0 bg-background1 flex items-center justify-center'>
                <div className=' bg-background2 w-80 rounded-md shadow-sm p-5 flex items-center justify-between relative'>
                    {/* <Signup onclick={changeHandeler}/> */}
                    {login ?  <Login onclick={changeHandeler}/> : <Signup onclick={changeHandeler}/>}
                </div>
        </div>
    );
};

export default pages;