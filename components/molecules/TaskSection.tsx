import React, { useState, useEffect } from 'react';
import Title from '../atom/Title';
import CheckButton from '../atom/CheckButton';
import { context } from '@/context/context';

const TaskSection = ({tasks}:any) => {
  const {state , dispatch} = context();

    return (
        <div className='w-full p-4'>
            {/* section for task */}
            <div className='m-1 h-80'>
                {tasks.tasks.map((item: any) => (
                    <CheckButton key={item._id} data={item}/>
                ))}
            </div>
            <Title text='COMPLITED' size={4} />
            <hr className='border-primary-2 border-opacity-30' />
            {/* section for complited Task */}
            <div className='m-1 opacity-60'>
                {tasks.completedTask.map((item: any, index: number) => (
                    <CheckButton key={index} data={item} />
                ))}
            </div>
        </div>
    );
};

export default TaskSection;
