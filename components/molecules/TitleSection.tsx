'use client'
import React from 'react';
import IconButton from '../atom/IconButton';
import { FaChevronLeft } from "react-icons/fa6";
import { FaChevronRight } from "react-icons/fa6";
import Title from '../atom/Title';
import TaskCounter from '../atom/TaskCounter';
const TitleSection = () => {
    const leftSide = ()=>{

    }   
    const rightSide = ()=>{

    }

    return (
        <div className='flex mt-8'>
            <IconButton icon={<FaChevronLeft/>} onclick={leftSide}/>
            <IconButton icon={<FaChevronRight/>} onclick={rightSide}/>
            <div className='flex items-center ml-3 w-24 justify-between'>
                <Title text='Today' size={1}/>
                <TaskCounter task={3}/>
            </div>
        </div>
    );
};

export default TitleSection;