import React from 'react';
import { IoClose } from "react-icons/io5";
import Title from '../atom/Title';
import IconButton from '../atom/IconButton';
import { useState } from 'react';
import { Input } from '@nextui-org/input';
import {Textarea} from "@nextui-org/input";
import IconTextButton from '../atom/IconTextButton';
import { FaCalendarDays } from 'react-icons/fa6';
import { parseDate} from "@internationalized/date";
import {Calendar} from "@nextui-org/calendar";
import { LuPlus } from "react-icons/lu";
import { context } from '@/context/context';
import { Dropdown , DropdownTrigger , DropdownMenu , DropdownItem} from '@nextui-org/dropdown';
import { Button } from '@nextui-org/button';
import { BsChevronDown } from "react-icons/bs";

const Editor = () => {
    const {state , dispatch} = context();
    const [selectedKeys, setSelectedKeys] = React.useState(new Set([""]));
    const selectedValue = React.useMemo(
      () => Array.from(selectedKeys).join(", ").replaceAll("_", " "),
      [selectedKeys]
      
    );
    const [name , setName] = useState();
    const closeHandler= ()=>{

    };
    const inputHandler=(e:any)=>{
        setName(e.target.value)
    };
    const subTaskHandler=()=>{

    }
    return (
        <div className=' w-[28rem] p-3'>
            <div className=' bg-background2 w-full h-full rounded-lg shadow-lg relative p-5 flex flex-col justify-between'>
                <div className=''>
                    <div className='flex items-center justify-between opacity-60'>
                        <Title size={1} text='Task:'/>
                        <IconButton icon={<IoClose/>} onclick={closeHandler}/>
                    </div>
                    <Input type='text' variant='bordered' value={name} onChange={inputHandler} label='List Name' size='sm'/>
                    <Textarea
                        type='text'
                        label="Description"
                        variant="bordered"
                        // labelPlacement="outside"
                        className="max-w-xs mt-2"
                        />
                    <div className=' relative'>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button 
                                variant="bordered" 
                                className="capitalize w-full flex items-center justify-between mt-3"
                                >
                                    <p>{selectedValue ? selectedValue : 'Select List'}</p>
                                    <BsChevronDown/>
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
                    </div>
                    <div className=' relative'>
                        <Dropdown>
                            <DropdownTrigger>
                                <Button 
                                variant="bordered" 
                                className="capitalize w-full flex items-center justify-between mt-3"
                                >
                                    <p>{selectedValue ? selectedValue : 'Select List'}</p>
                                    <BsChevronDown/>
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
                    </div>
                    <div className=' opacity-60 mt-4'>
                        <Title text='Subtask:' size={1}/>
                    </div>
                    <Input type='text' placeholder='Add New subTask' variant='underlined' startContent={
                        <IconButton icon={<LuPlus/>} onclick={subTaskHandler}/>
                    }/>
                </div>

                <div className='gap-2 flex'>
                    <Button className='w-1/2 ' variant='bordered'>Delete Task</Button>
                    <Button className='w-1/2 ' variant='solid' color='primary'>Save Changes</Button>
                </div>
            </div>
        </div>
    );
};

export default Editor;