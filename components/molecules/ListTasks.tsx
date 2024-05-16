'use client'
import React from 'react';
import { useState } from 'react';
import Title from '../atom/Title';
import { Button } from '@nextui-org/button';
import Icon from '../atom/Icon';
import { FaPlus } from "react-icons/fa";
import ListTask from '../atom/ListTask';
import IconTextButton from '../atom/IconTextButton';
import { Input } from '@nextui-org/input';
import {  Modal,   ModalContent, useDisclosure ,   ModalHeader,   ModalBody,   ModalFooter} from "@nextui-org/modal";

const ListTasks = () => {
    const [listData , setListData] = useState({
        name: '',
        color:'1',
    })
    const colorSethandeler = (color:string)=>{
        setListData({...listData , color: color});
        console.log(listData);
        
    }
    const inputHandeler = (e:any)=>{
        setListData({...listData , name: e.target.value});
    }
    const addHandeler = () =>{}
    const {isOpen, onOpen, onOpenChange} = useDisclosure();

    return (
        <div>
            <Title text='LIST' size={4}/>
            <ListTask name='Profile' color='#e6f263'/>
            <IconTextButton text='Add New List' icon={<FaPlus/>} name='add' onClick={onOpen}/>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Add New List</ModalHeader>
                    <ModalBody>
                        <Input type='text' value={listData.name} onChange={inputHandeler} label='List Name' size='sm'/>
                        <Title text='pick a color:' size={1} />
                        <div className='flex items-center justify-around'>
                            <button  onClick={()=>colorSethandeler('1')} className={` w-8 h-8 hover:opacity-90 transition-all bg-primary-400 opacity-40 rounded-md ${listData.color === '1' && 'border-opa scale-110 transition-all !opacity-100'} `}></button>
                            <button  onClick={()=>colorSethandeler('2')} className={` w-8 h-8 hover:opacity-90 transition-all bg-primary-400 opacity-40 rounded-md ${listData.color === '2' && 'border-opa scale-110 transition-all !opacity-100'} `}></button>
                            <button  onClick={()=>colorSethandeler('3')} className={` w-8 h-8 hover:opacity-90 transition-all bg-primary-400 opacity-40 rounded-md ${listData.color === '3' && 'border-opa scale-110 transition-all !opacity-100'} `}></button>
                            <button  onClick={()=>colorSethandeler('4')} className={` w-8 h-8 hover:opacity-90 transition-all bg-primary-400 opacity-40 rounded-md ${listData.color === '4' && 'border-opa scale-110 transition-all !opacity-100'} `}></button>
                            <button  onClick={()=>colorSethandeler('5')} className={` w-8 h-8 hover:opacity-90 transition-all bg-primary-400 opacity-40 rounded-md ${listData.color === '5' && 'border-opa scale-110 transition-all !opacity-100'} `}></button>
                            <button  onClick={()=>colorSethandeler('6')} className={` w-8 h-8 hover:opacity-90 transition-all bg-primary-400 opacity-40 rounded-md ${listData.color === '6' && 'border-opa scale-110 transition-all !opacity-100'} `}></button>
                            <button  onClick={()=>colorSethandeler('7')} className={` w-8 h-8 hover:opacity-90 transition-all bg-primary-400 opacity-40 rounded-md ${listData.color === '7' && 'border-opa scale-110 transition-all !opacity-100'} `}></button>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                        Close
                        </Button>
                        <Button color="primary" onPress={onClose}>
                        Add
                        </Button>
                    </ModalFooter>
                    </>
                )}
                </ModalContent>
            </Modal>
        </div>
    );
};

export default ListTasks;