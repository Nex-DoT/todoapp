"use client"
import React from 'react';
import { useState } from 'react';
import {Input} from "@nextui-org/input";
import { IoIosMail } from "react-icons/io";
import { PiPasswordFill } from "react-icons/pi";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import Title from '../atom/Title';

const Login = () => {
    const [eye , setEye] = useState(false);
    const formHandeler=()=>{
        
    }
    return (
        <form className=' flex gap-3 flex-col w-full h-full items-center justify-between'>
              <Title text='Fill this form and Login :)' size={1}/>
                    <Input
                        type="email"
                        placeholder="your Email@example.com"
                        startContent={
                            <IoIosMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                    />
                    <Input
                        type={eye ?'text' : 'password'}
                        placeholder="your password"
                        startContent={
                            <PiPasswordFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        endContent={
                            <div className=' cursor-pointer' onClick={()=>setEye(!eye)}>{eye ?<VscEye/> : <VscEyeClosed/>}</div>
                        }
                    />
                    <p className='text-xs'>if you dont have an account <span className=' text-primary-500 cursor-pointer underline'>click on me.</span></p>
                    <button className='w-full h-10 bg-primary-400 rounded-md transition-colors hover:bg-primary-500' type='submit' onClick={formHandeler}>Login</button>
        </form>
    );
};

export default Login;