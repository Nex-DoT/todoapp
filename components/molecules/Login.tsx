"use client"
import React from 'react';
import { useState } from 'react';
import {Input} from "@nextui-org/input";
import { IoIosMail } from "react-icons/io";
import { PiPasswordFill } from "react-icons/pi";
import { VscEye } from "react-icons/vsc";
import { VscEyeClosed } from "react-icons/vsc";
import Title from '../atom/Title';
import { regexTest } from '@/lib/utils';
import { headers } from 'next/headers';
const Login = ({onclick}:{onclick:()=>void}) => {
    const [eye , setEye] = useState(false);
    const [error , setError] = useState({
        email:'',
        password:''
    });
    const [data , setData] = useState({
        email:'',
        password:'',
    })
    const formHandeler=async (e:any)=>{
        e.preventDefault();
        setError(regexTest('login' , data))
        if (error.email === "" && error.password === "") {
            try {
                const res = await fetch('/api/auth/login', {
                    method: 'POST',
                    body: JSON.stringify(data),
                    headers: { "Content-Type": "application/json" }
                });
    
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res}`);
                }
    
                const text = await res.text();
    
                let newdata;
    
                try {
                    newdata = JSON.parse(text);
                } catch (e) {
                    console.error('Error parsing JSON response:', e);
                    return;
                }
    
                console.log(newdata);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }
    }
    return (
        <form className=' flex gap-3 flex-col w-full h-full items-center justify-between'>
              <Title text='Fill this form and Login :)' size={1}/>
                    <Input
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
                    <p className='text-xs'>if you dont have an account <span className=' text-primary-500 cursor-pointer underline' onClick={onclick}>click on me.</span></p>
                    <button className='w-full h-10 bg-primary-400 rounded-md transition-colors hover:bg-primary-500' type='submit' onClick={formHandeler}>Login</button>
        </form>
    );
};

export default Login;