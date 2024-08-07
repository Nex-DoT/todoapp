"use client";
import React, { useState } from 'react';
import { Input } from "@nextui-org/input";
import { IoIosMail } from "react-icons/io";
import { PiPasswordFill } from "react-icons/pi";
import { VscEye, VscEyeClosed } from "react-icons/vsc";
import { useRouter } from 'next/navigation';
import Title from '../atom/Title';
import { signIn } from 'next-auth/react';
import { useSession } from 'next-auth/react';

const Login = ({ onclick }: { onclick: () => void }) => {
    const session = useSession()
    const router = useRouter();
    const [eye, setEye] = useState(false);
    const [error, setError] = useState({
        email: '',
        password: ''
    });
    const [data, setData] = useState({
        email: 'karfarmaTest@gmail.com',
        password: '123456Ab',
    });

    const formHandler = async (e: any) => {
        e.preventDefault();
        await signIn('credentials', {
            email: data.email,
            password: data.password,
            redirect:false
        });
        router.push('/dashboard')
        console.log(session);
        
    }

    return (
        <form className='flex gap-3 flex-col w-full h-full items-center justify-between' onSubmit={formHandler}>
            <Title text='Fill this form and Login :)' size={1} />
            <Input
                type="email"
                isInvalid={error.email !== ""}
                errorMessage={error.email}
                onChange={(e) => setData({ ...data, email: e.target.value })}
                placeholder="your Email@example.com"
                startContent={
                    <IoIosMail className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
            />
            <Input
                type={eye ? 'text' : 'password'}
                isInvalid={error.password !== ""}
                errorMessage={error.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
                placeholder="your password"
                startContent={
                    <PiPasswordFill className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
                }
                endContent={
                    <div className='cursor-pointer' onClick={() => setEye(!eye)}>
                        {eye ? <VscEye /> : <VscEyeClosed />}
                    </div>
                }
            />
            <p className='text-xs'>
                if you dont have an account <span className='text-primary-500 cursor-pointer underline' onClick={onclick}>click on me.</span>
            </p>
            <button className='w-full h-10 bg-primary-400 rounded-md transition-colors hover:bg-primary-500' type='submit'>Login</button>
        </form>
    );
};

export default Login;
