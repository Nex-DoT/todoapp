"use client"
import React from 'react';
import { FaPlus } from 'react-icons/fa';
import IconButton from '../atom/IconButton';
import IconTextButton from '../atom/IconTextButton';
import { LuAlarmClock } from "react-icons/lu";
import { Button } from '@nextui-org/button';
import { FaTasks } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaStar } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import {Calendar} from "@nextui-org/calendar";
import {parseDate} from "@internationalized/date";
import {Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,} from "@nextui-org/dropdown";
import {TimeInput} from "@nextui-org/date-input";
const InputTask = () => {
  let today = new Date();
  let dateString = today.toISOString().split('T')[0];
  let [value, setValue] = React.useState(parseDate(dateString));
  let [data , setData ] = React.useState({
    isImportant: false,
    date: `${value}`,
    time: '',
    task: '',
  });
    const [open , setOpen] = React.useState({
        clock: false,
        Calendar: false,
    })
    const [selectedKeys, setSelectedKeys] = React.useState(new Set(["text"]));

  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
    const plusHandeler= ()=>{

    }
    const toggelHandeler = (e?: React.MouseEvent<HTMLButtonElement>): void => {
        const buttonName = (e?.target as HTMLButtonElement).name;
        setOpen({ ...open, [buttonName]: !(open as any)[buttonName] });
        console.log(open);
    };
    return (
        <div className='flex items-center justify-between h-16 bg-background2 rounded-md w-full mb-4 '>
            <div className='flex items-center w-5/6' >
                <IconButton icon={<FaPlus/>} onclick={plusHandeler}/>
                <input className=' bg-background2 outline-none w-2/4' type="text" placeholder='Type a ToDo' />
            </div>
            <div className='w-2/5 flex items-center justify-around relative'>
            <Dropdown>
                <DropdownTrigger>
                    <Button 
                    variant="light" 
                    className="capitalize"
                    >
                    {selectedValue}
                    </Button>
                </DropdownTrigger>
                <DropdownMenu 
                    aria-label="Single selection example"
                    variant="light"
                    disallowEmptySelection
                    selectionMode="single"
                    selectedKeys={selectedKeys}
                    onSelectionChange={setSelectedKeys as any}
                >
                    <DropdownItem key="text">Text</DropdownItem>
                    <DropdownItem key="number">Number</DropdownItem>
                    <DropdownItem key="date">Date</DropdownItem>
                    <DropdownItem key="single_date">Single Date</DropdownItem>
                    <DropdownItem key="iteration">Iteration</DropdownItem>
                </DropdownMenu>
                </Dropdown>
                <div className=' relative'>
                    <IconTextButton text={`${value}`} name='Calendar' icon={<FaCalendarDays/>}  onClick={toggelHandeler}/>
                    { open.Calendar && <div className=' absolute bottom-20 right-0 bg-input p-1 rounded-2xl before:w-8 before:h-8 before:absolute before:-bottom-2 before:rotate-45 before:bg-input before:right-10 shadow-xl animate-appearance-in'>
                      <Calendar className=' shadow-none overflow-hidden' aria-label="Date (Controlled)" value={value} onChange={setValue} />
                    </div>}
                </div>
                <div className=' relative '>
                    <IconButton icon={<LuAlarmClock/>} name='clock' onclick={toggelHandeler}/>
                    { open.clock && <div className=' absolute bottom-20 -left-6 bg-input p-1 rounded-2xl before:w-8 before:h-8 before:absolute before:-bottom-2 before:rotate-45 before:bg-input before:right-10 shadow-xl animate-appearance-in'>
                      <TimeInput className=' shadow-none overflow-hidden' />
                    </div>}
                </div>
                <IconButton icon={data.isImportant? <FaStar/> : <FaRegStar/>} onclick={()=>setData({...data , isImportant:!data.isImportant})}/>
            </div>
        </div>
    );
};

export default InputTask;