'use client'
import React from 'react';
import { useState } from 'react';
import Signup from '@/components/molecules/Signup';
import Login from '@/components/molecules/Login';
import { useEffect } from 'react';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import { Spinner } from '@nextui-org/spinner';
const Pages = () => {
    const [login ,setLogin] = useState(true);
    const { data: session, status }= useSession();
    const router = useRouter()
    const changeHandeler = ()=>{
        setLogin(!login);
    }
    useEffect(()=>{
        if(status === 'authenticated'){
            router.push('/dashboard')
        }
    },[status])
if (status === 'loading'){
    return (
        <div className='w-full h-full flex items-center justify-center'>
          <Spinner size='lg' color='primary'/>
        </div>)
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