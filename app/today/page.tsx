'use client'
import React from 'react';
import CheckButton from '@/components/atom/CheckButton';
import { context } from '@/context/context';
const Today = () => {
    const {state} = context();
    const date = new Date()
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const Today = [state.tasks.find( (item : any) => item.date === formattedDate)];
    
    return (
        <div className='w-full'>
            {Today && Today.map( (item:any) => <CheckButton data={item}/>)}
        </div>
    );
};

export default Today;