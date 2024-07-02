"use client"
import React, { useState , useEffect } from 'react';
import { Button } from '@nextui-org/button';
import { Calendar} from "@nextui-org/calendar";
import { TimeInput} from "@nextui-org/date-input";
import { parseDate} from "@internationalized/date";
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem,} from "@nextui-org/dropdown";
import { FaPlus } from 'react-icons/fa';
import { LuAlarmClock } from "react-icons/lu";
import { FaStar } from "react-icons/fa";
import { FaRegStar } from "react-icons/fa";
import { FaCalendarDays } from "react-icons/fa6";
import { context } from '@/context/context';
import IconButton from '../atom/IconButton';
import { AiOutlineMore } from "react-icons/ai";

import IconTextButton from '../atom/IconTextButton';
import Task from '@/models/Task';
const InputTask = () => {
  const {state , dispatch} = context();
  const [time , setTime] = useState();
  const [more , setMore] = useState(false);
  let today = new Date();
  let dateString = today.toISOString().split('T')[0];
  let [date, setDate] = React.useState(parseDate(dateString));
  const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
  const selectedValue = React.useMemo(
    () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    [selectedKeys]
  );
  let [data , setData ] = React.useState({
    email: state.email,
    task: '',
    isImportant: false,
    date:`${date}`,
    time: '',
    description:'',
    list: `${selectedValue}`
  });
    const [open , setOpen] = React.useState({
        clock: false,
        Calendar: false,
    })
      // Use useEffect to update `data.list` whenever `selectedKeys` changes
  useEffect(() => {
    setData(prevData => ({
      ...prevData,
      list: Array.from(selectedKeys).join(", ").replaceAll("_", " "),
    }));
  }, [selectedKeys]);
    const handleTime = (value: any)=>{
      const formativeTime = formatTime(value);

      setTime(value);
      console.log(formativeTime);
      setData({...data , time: formativeTime})
      
    }
    const formatTime = (timeObj:any) => {
      let { hour, minute } = timeObj;
      const period = hour >= 12 ? "PM" : "AM";
      hour = hour % 12 || 12; // Convert hour to 12-hour format
      const formattedHour = hour.toString().padStart(2, '0');
      const formattedMinute = minute.toString().padStart(2, '0');
      return `${formattedHour}:${formattedMinute} ${period}`;
    };
    const plusHandeler = async () => {
      
      try {
        const res = await fetch('api/event/task', {
          method: 'POST',
          body: JSON.stringify(data),
          headers: { 'Content-Type': 'application/json' },
        });
    
        if (!res.ok) {
          // Handle HTTP errors
          console.error('HTTP error', res.status, res.statusText);
          return;
        }
    
        const text = await res.text();
        if (!text) {
          // Handle empty response
          console.error('Empty response');
          return;
        }
    
        let json;
        try {
          json = JSON.parse(text);
        } catch (e) {
          // Handle JSON parse error
          console.error('JSON parse error', e);
          return;
        }
    
        console.log(json);
        dispatch({type:'ADDTASK' , payload: json.newTask})
    
      } catch (error) {
        // Handle network errors or other fetch-related errors
        console.error('Fetch error', error);
      }
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
                <input className=' bg-background2 outline-none w-2/4' type="text" value={data.task} onChange={(e)=>setData({...data , task:e.target.value})} placeholder='Type a ToDo' />
            </div>

            <div className='md:hidden'>
                <IconButton icon={<AiOutlineMore />} onclick={() => { setMore(!more) }} />
            </div>
            {more && (
            <div className='md:hidden w-28 flex flex-col items-center justify-around absolute bottom-24 right-0 bg-background2 p-4 rounded-md shadow-lg z-10 md:relative animate-appearance-in'>
            <Dropdown>
                <DropdownTrigger>
                    <Button 
                    variant="light" 
                    className="capitalize"
                    >
                    {selectedValue ? selectedValue : 'Select List'}
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
                    {state.list[0] && state.list.map( (item:any) => <DropdownItem key={item.name}>{item.name}</DropdownItem>)}
                    
                </DropdownMenu>
                </Dropdown>
                <div className=' relative'>
                    <IconTextButton text={`${date}`} name='Calendar' icon={<FaCalendarDays/>}  onClick={toggelHandeler}/>
                    { open.Calendar && <div className=' absolute bottom-20 right-0 bg-input p-1 rounded-2xl before:w-8 before:h-8 before:absolute before:-bottom-2 before:rotate-45 before:bg-input before:right-10 shadow-xl animate-appearance-in'>
                      <Calendar className=' shadow-none overflow-hidden' aria-label="Date (Controlled)" value={date} onChange={setDate} />
                    </div>}
                </div>
                <div className=' relative '>
                    <IconButton icon={<LuAlarmClock/>} name='clock' onclick={toggelHandeler}/>
                    { open.clock && <div className=' absolute bottom-20 -left-6 bg-input p-1 rounded-2xl before:w-8 before:h-8 before:absolute before:-bottom-2 before:rotate-45 before:bg-input before:right-10 shadow-xl animate-appearance-in z-20'>
                      <TimeInput aria-label="Select time" value={time} onChange={handleTime} className=' shadow-none overflow-hidden' />
                    </div>}
                </div>
                <IconButton icon={data.isImportant? <FaStar/> : <FaRegStar/>} onclick={()=>setData({...data , isImportant:!data.isImportant})}/>
            </div>)}
            <div className='hidden md:flex items-center '>
            <Dropdown>
                <DropdownTrigger>
                    <Button 
                    variant="light" 
                    className="capitalize"
                    >
                    {selectedValue ? selectedValue : 'Select List'}
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
                    {state.list[0] && state.list.map( (item:any) => <DropdownItem key={item.name}>{item.name}</DropdownItem>)}
                    
                </DropdownMenu>
                </Dropdown>
                <div className=' relative'>
                    <IconTextButton text={`${date}`} name='Calendar' icon={<FaCalendarDays/>}  onClick={toggelHandeler}/>
                    { open.Calendar && <div className=' absolute bottom-20 right-0 bg-input p-1 rounded-2xl before:w-8 before:h-8 before:absolute before:-bottom-2 before:rotate-45 before:bg-input before:right-10 shadow-xl animate-appearance-in'>
                      <Calendar className=' shadow-none overflow-hidden' aria-label="Date (Controlled)" value={date} onChange={setDate} />
                    </div>}
                </div>
                <div className=' relative '>
                    <IconButton icon={<LuAlarmClock/>} name='clock' onclick={toggelHandeler}/>
                    { open.clock && <div className=' absolute bottom-20 -left-6 bg-input p-1 rounded-2xl before:w-8 before:h-8 before:absolute before:-bottom-2 before:rotate-45 before:bg-input before:right-10 shadow-xl animate-appearance-in'>
                      <TimeInput aria-label="Select time" value={time} onChange={handleTime} className=' shadow-none overflow-hidden' />
                    </div>}
                </div>
                <IconButton icon={data.isImportant? <FaStar/> : <FaRegStar/>} onclick={()=>setData({...data , isImportant:!data.isImportant})}/>
            </div>
        </div>
    );
};

export default InputTask;