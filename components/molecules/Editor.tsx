import React from 'react';
import { IoClose } from "react-icons/io5";
import Title from '../atom/Title';
import IconButton from '../atom/IconButton';
const Editor = () => {
    const closeHandler =()=>{

    }
    return (
        <div className=' w-[28rem] p-3'>
            <div className=' bg-background2 w-full h-full rounded-lg shadow-lg relative'>
                <div className='flex items-center justify-between pl-4 opacity-60'>
                    <Title size={1} text='Task:'/>
                    <IconButton icon={<IoClose/>} onclick={closeHandler}/>
                </div>
            </div>
        </div>
    );
};

export default Editor;