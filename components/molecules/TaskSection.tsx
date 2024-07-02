import React, { useState, useEffect } from 'react';
import Title from '../atom/Title';
import CheckButton from '../atom/CheckButton';
import { context } from '@/context/context';
import { ScrollShadow } from '@nextui-org/scroll-shadow';
const TaskSection = ({tasks}:any) => {
  const {state , dispatch} = context();

    return (
        <div className='w-full p-4'>
            {/* section for task */}
            <div className='m-1 max-h-[450px] min-h-80'>
                <ScrollShadow className='m-1 max-h-[450px] min-h-80' hideScrollBar>
                    {tasks.tasks.map((item: any) => (
                        <CheckButton key={item._id} data={item}/>
                    ))}
                </ScrollShadow>
            </div>
            <Title text='COMPLITED' size={4} />
            <hr className='border-primary-2 border-opacity-30' />
            {/* section for complited Task */}
            <div className='m-0 opacity-60 md:m-1 h-32 w-full'>
                <ScrollShadow className='w-full h-full overflow-x-hidden ' hideScrollBar>
                    {tasks.completedTask.map((item: any, index: number) => (
                        <CheckButton key={index} data={item} />
                    ))}
                </ScrollShadow>
            </div>
        </div>
    );
};

export default TaskSection;
