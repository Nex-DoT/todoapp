import React from 'react';
import Title from '../atom/Title';
import CheckButton from '../atom/CheckButton';
const TaskSection = () => {
    return (
        <div className='w-full p-4 '>
            {/* section for task */}
            <div className='m-5 h-80'>
                <CheckButton/>
            </div>
            <Title text='COMPLITED' size={4}/>
            <hr className=' border-primary-2  border-opacity-30' />
            {/* section for complited Task */}
            <div className='m-5 opacity-60'>
                <CheckButton/>
                <CheckButton/>
            </div>
            
        </div>
    );
};

export default TaskSection;