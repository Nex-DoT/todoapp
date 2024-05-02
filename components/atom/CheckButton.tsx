'use client'
import React,{useState} from 'react';
import {Checkbox} from "@nextui-org/checkbox";
import { Button } from '@nextui-org/button';
import IconButton from './IconButton';
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
const CheckButton = () => {
    const [icon , setIcon ] = useState(false);
    const clickhandeler = ()=>{
        setIcon(!icon);
    }
    return (
            <Button
                className='w-full flex items-center justify-between h-14'
                variant='light'
            >
                <Checkbox defaultSelected lineThrough>Option</Checkbox>
                <IconButton icon={ icon ? <FaRegStar/> : <FaStar/>} onclick={clickhandeler}/>
            </Button>
    );
};

export default CheckButton;