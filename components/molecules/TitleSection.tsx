'use client'
import React  from 'react';
import Title from '../atom/Title';
import TaskCounter from '../atom/TaskCounter';

const TitleSection = ({path}:any) => {

    return (
        <div className='flex pt-7 pl-4 items-center gap-4'>
            <Title text={path === '' ? 'Tasks' : path} size={1} />
            <TaskCounter task={3} />
        </div>
    );
};

export default TitleSection;
