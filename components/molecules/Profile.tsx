"use client"
import React from 'react';
import Image from 'next/image';
import Title from '../atom/Title';
import { truncateText } from '@/lib/utils';
import { context } from '@/context/context';
const Profile = () => {
    const {state , dispatch} = context();

    return (
        <div className='flex items-center w-full '>
            {state.email === 'Tehran13825670442377@gmail.com'  && <Image className='rounded-full absolute top-1 rotate-45 left-12' src={"https://cdn-icons-png.flaticon.com/512/5524/5524802.png"} alt='png' width={20} height={20}/>}
            <Image className='rounded-full' src={"https://cdn-icons-png.freepik.com/512/4128/4128244.png"} alt='png' width={45} height={45} priority={false}/>
            <div className='flex flex-col pl-3'>
                <Title text={truncateText(state.username , 10)} size={2}/>
                <Title text={truncateText(state.email , 19)} size={3}/>
            </div>
        </div>
    );
};

export default Profile;