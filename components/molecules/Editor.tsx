'use client'
import React, { useState, useEffect, useMemo } from 'react';
import { IoClose } from "react-icons/io5";
import Title from '../atom/Title';
import IconButton from '../atom/IconButton';
import { Input, Textarea } from '@nextui-org/input';
import IconTextButton from '../atom/IconTextButton';
import { FaCalendarDays } from 'react-icons/fa6';
import { parseDate } from "@internationalized/date";
import { Calendar } from "@nextui-org/calendar";
import { LuPlus } from "react-icons/lu";
import { context } from '@/context/context';
import { Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from '@nextui-org/dropdown';
import { Button } from '@nextui-org/button';
import { BsChevronDown } from "react-icons/bs";

const Editor = ({open}:any) => {
    const { state, dispatch } = context();
    const [data, setData] = useState(state.editor);
    const [selectedKeys, setSelectedKeys] = useState(new Set([""]));
    const selectedValue = useMemo(
      () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
      [selectedKeys]
    );

    useEffect(() => {
        setData(state.editor);

    }, [state.editor]);
    useEffect(()=>{
        setData({...data , list: selectedValue})
    },[selectedValue])

    const inputHandler = (e: any) => {
        setData({ ...data, task: e.target.value });
    };

    const closeHandler = () => {
        open(false);
    };

    const changeCalendar = (e: any) => {
        const year = e.year;
        const month = String(e.month).padStart(2, '0');  // Ensure month is two digits
        const day = String(e.day).padStart(2, '0');      // Ensure day is two digits
        setData({ ...data, date: `${year}-${month}-${day}` });
    };

    const subTaskHandler = () => {};

    const parseDateIfValid = (dateStr: string) => {
        try {
            return parseDate(dateStr);
        } catch (error) {
            console.error("Invalid date format:", dateStr);
            return undefined;
        }
    };

    const saveHandeler= async()=>{
        const res = await fetch('api/event/task' , {
                                    method: 'PATCH',
                                    body: JSON.stringify(data),
                                    headers: {'Content-Type' : 'application/json'}
                                })
        const newData = await res.json();
        console.log(newData);
        dispatch({type:'UPDATETASK' , payload: newData.taskUpdate})
    }
    return (
        <div className='w-[28rem] p-3'>
            <div className='bg-background2 w-full h-full rounded-lg shadow-lg relative p-5 flex flex-col justify-between gap-3'>
                <div>
                    <div className='flex items-center justify-between opacity-60'>
                        <Title size={1} text='Task:' />
                        <IconButton icon={<IoClose />} onclick={closeHandler} />
                    </div>
                    <Input 
                        type='text' 
                        variant='bordered' 
                        value={data.task || ''} // Ensuring default value
                        onChange={inputHandler} 
                        label='List Name' 
                        size='sm' 
                    />
                    <Textarea
                        type='text'
                        label="Description"
                        variant="bordered"
                        className="max-w-xs mt-2"
                    />
                    <div className='relative'>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button 
                                    variant="bordered" 
                                    className="capitalize w-full flex items-center justify-between mt-3"
                                >
                                    <p>{data.date ? data.date : 'Select Date'}</p>
                                    <BsChevronDown />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu 
                                aria-label="Single selection example"
                                variant="light"
                                closeOnSelect={false}
                            >
                                <DropdownItem textValue='calendar'>
                                    <Calendar 
                                        aria-label="Date (Controlled)"
                                        value={data.date ? parseDateIfValid(data.date) : undefined} 
                                        onChange={changeCalendar} 
                                    />
                                </DropdownItem>
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className='relative'>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button 
                                    variant="bordered" 
                                    className="capitalize w-full flex items-center justify-between mt-3"
                                >
                                    <p>{data.list ? data.list : 'Select List'}</p>
                                    <BsChevronDown />
                                </Button>
                            </DropdownTrigger>
                            <DropdownMenu 
                                aria-label="Single selection example"
                                variant="light"
                                disallowEmptySelection
                                selectionMode="single"
                                selectedKeys={selectedKeys}
                                onSelectionChange={setSelectedKeys as any}
                                className='w-full'
                            >
                                {state.list[0] && state.list.map((item: any) => <DropdownItem key={item.name}>{item.name}</DropdownItem>)}  
                            </DropdownMenu>
                        </Dropdown>
                    </div>
                    <div className='opacity-60 mt-4'>
                        <Title text='Subtask:' size={1} />
                    </div>
                    <Input 
                        className='mt-4' 
                        type='text' 
                        placeholder='Add New subTask' 
                        variant='underlined' 
                        startContent={<IconButton icon={<LuPlus />} onclick={subTaskHandler} />}
                    />
                </div>
                <div className='gap-2 flex'>
                    <Button className='w-1/2' variant='bordered'>Delete Task</Button>
                    <Button className='w-1/2' variant='solid' color='primary' onClick={saveHandeler}>Save Changes</Button>
                </div>
            </div>
        </div>
    );
};

export default Editor;

