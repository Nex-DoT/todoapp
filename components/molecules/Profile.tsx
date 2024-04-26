"use client"
import React from 'react';
import Image from 'next/image';
import Title from '../atom/Title';
const Profile = () => {
    return (
        <div className='flex items-center w-full '>
            <Image className='rounded-full' src={"https://avatars.githubusercontent.com/u/123931213?v=4"} alt='png' width={45} height={45}/>
            <div className='flex flex-col pl-3'>
                <Title text='Erfan mahmoudi' size={2}/>
                <Title text='nexerfan1@gmail.com' size={3}/>
            </div>
        </div>
    );
};

export default Profile;