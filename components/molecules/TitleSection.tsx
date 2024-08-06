'use client'
import React  from 'react';
import Title from '../atom/Title';
import TaskCounter from '../atom/TaskCounter';
import { context } from '@/context/context';
const TitleSection = () => {
    const { state } = context()
    const route = Object.keys(state.activeRoute).find(key => state.activeRoute[key] === true);
    return (
        <div className='flex pt-7 pl-4 items-center gap-4'>
            <Title text={route as string} size={1} />
            <TaskCounter task={3} />
        </div>
    );
};

export default TitleSection;
