"use client"
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import IconButton from '../atom/IconButton';
import IconTextButton from '../atom/IconTextButton';
import { LuAlarmClock } from "react-icons/lu";
import { FaTasks } from "react-icons/fa";
import { useState } from 'react';
import { FaCalendarDays } from "react-icons/fa6";
import {DatePicker} from "@nextui-org/date-picker";
import {Calendar} from "@nextui-org/calendar";
import {DateInput} from "@nextui-org/date-input";
import {parseDate} from "@internationalized/date";

const InputTask = () => {
  let today = new Date();
  let dateString = today.toISOString().split('T')[0];
  console.log(dateString);
  
  let [value, setValue] = React.useState(parseDate(dateString));
  
    const plusHandeler= ()=>{

    }

    return (
        <div className='flex items-center h-16 bg-background2 rounded-md w-full mb-4 '>
            <div className='flex items-center w-5/6' >
                <IconButton icon={<FaPlus/>} onclick={plusHandeler}/>
                <input className=' bg-background2 outline-none w-2/4' type="text" placeholder='Type a ToDo' />
            </div>
            <div className='w-1/5 flex items-center relative'>
                <IconTextButton text='Today' icon={<FaTasks/>} />
                <div className=' relative'>
                    <IconTextButton text='Calendar' icon={<FaCalendarDays/>} />
                    <div className=' absolute bottom-20 right-0 bg-input p-1 rounded-2xl before:w-8 before:h-8 before:absolute before:-bottom-2 before:rotate-45 before:bg-input before:right-10 shadow-xl'>
                      <Calendar className=' shadow-none' aria-label="Date (Controlled)" value={value} onChange={setValue} />
                    </div>
                </div>
                <IconButton icon={<LuAlarmClock/>} onclick={plusHandeler}/>
            </div>
        </div>
    );
};

export default InputTask;