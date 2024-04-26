import React from 'react';
import InputTask from '../molecules/InputTask';
import TitleSection from '../molecules/TitleSection';
const TasksSection = () => {
    return (
        <div className='h-full flex flex-col items-center justify-between'>
            <div className='w-full'>
                <TitleSection/>
            </div>
            <div className='w-full relative pl-6 pr-6'>
                <InputTask/>
            </div>
        </div>
    );
};

export default TasksSection;