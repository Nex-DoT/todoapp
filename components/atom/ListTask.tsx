import React from 'react';
import { Button } from '@nextui-org/button';
import TaskCounter from './TaskCounter';
import { ListTaskType } from '@/types';
const ListTask = ({name , color}:ListTaskType) => {
    return (
        <Button
            variant='clear'
            className='w-full flex items-center justify-between'
            startContent={
                <div className='flex items-center gap-2'>
                    <div style={{
                        backgroundColor:`${color}`
                    }}  className='w-4 h-4 rounded-md'>

                    </div>
                    {name}
                </div>
            }
        >
            <TaskCounter task={2} />
        </Button>
    );
};

export default ListTask;