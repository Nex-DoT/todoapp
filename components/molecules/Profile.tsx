"use client"

import React from 'react';
import Image from 'next/image';
import Title from '../atom/Title';
import { truncateText } from '@/lib/utils';
import { useSession } from 'next-auth/react';

const Profile = () => {

    const session = useSession();
    const email = truncateText(`${session.data?.user?.email}` , 19) ;
    const name = truncateText(`${session.data?.user?.name}` , 10) ;

    return (
        <div className='flex items-center w-full '>
            <Image className='rounded-full' src={"https://cdn-icons-png.freepik.com/512/4128/4128244.png"} alt='png' width={45} height={45} priority={false}/>
            <div className='flex flex-col pl-3'>
                <Title text={name} size={2}/>
                <Title text={email} size={3}/>
            </div>
        </div>
    );
};

export default Profile;