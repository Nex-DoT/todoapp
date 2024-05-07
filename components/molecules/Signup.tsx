'use client'
import React from 'react';
import { useState } from 'react';
import {Input} from "@nextui-org/input";
import { IoIosMail } from "react-icons/io";
import { TiUserOutline } from "react-icons/ti";
import { PiPasswordFill } from "react-icons/pi";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import Title from '../atom/Title';
import { regexTest } from '@/lib/utils';
import { authSignUpType } from '@/types';
const Signup = () => {
    const [eye , setEye] = useState(false);
    const [error , setError] = useState<authSignUpType>({
        username:'',
        email:'',
        password:'',
    })
    const [data , setData] = useState({
        username:'',
        email:'',
        password:'',
    });
    const submitHandeler = (e : any)=>{
        e.preventDefault();
        setError(regexTest('signup' , data))
        console.log(error)
    }
    return (
        <form className=' flex gap-3 flex-col w-full h-full items-center justify-between'>
              <Title text='Fill this form and signup :)' size={1}/>
              <Input    
                        value={data.username}
                        type="text"
                        isInvalid={error.username === "" ? false :true}
                        errorMessage={error.username}
                        onChange={(e) => setData({...data, username: e.target.value})}
                        placeholder="your user name"
                        startContent={
                            <TiUserOutline className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                    />
                    <Input
                        value={data.email}
                        type="email"
                        isInvalid={error.email === "" ? false :true}
                        errorMessage={error.email}
                        onChange={(e) => setData({...data, email: e.target.value})}
                        placeholder="your Email@example.com"
                        startContent={
                            <IoIosMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                    />
                    <Input
                        value={data.password}
                        type={eye ?'text' : 'password'}
                        isInvalid={error.password === "" ? false :true}
                        errorMessage={error.password}
                        onChange={(e) => setData({...data, password: e.target.value})}
                        placeholder="your password"
                        startContent={
                            <PiPasswordFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                        }
                        endContent={
                            <div className=' cursor-pointer' onClick={()=>setEye(!eye)}>{eye ?<VscEye/> : <VscEyeClosed/>}</div>
                        }
                    />
                    <p className='text-xs'>if you already have an account <span className=' text-primary-500 cursor-pointer underline'>click on me.</span></p>
                    <button className='w-full h-10 bg-primary-400 rounded-md transition-colors hover:bg-primary-500' onClick={submitHandeler} type='submit'>Sign-UP</button>
        </form>
    );
};

export default Signup;