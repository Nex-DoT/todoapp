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
        name: 'NEW List',
        color:'FF5733',
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
    const ceatingListHandeler = async ()=>{
        try {
            const res = await fetch('/api/event/list', {
                method: 'POST',
                body: JSON.stringify(listData),
                headers: { "Content-Type": "application/json" }
            });

            if (!res.ok) {
                throw new Error(`HTTP error! status: ${res}`);
            }

            const text = await res.text();

            let newdata;

            try {
                newdata = JSON.parse(text);
            } catch (e) {
                console.error('Error parsing JSON response:', e);
                return;
            }

            console.log(newdata);
        } catch (error) {
            console.error('Error fetching data:', error);
        }
    }
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
                            <button  onClick={()=>colorSethandeler('FF5733')} className={` w-8 h-8 hover:opacity-90 transition-all bg-[#FF5733] opacity-40 rounded-md ${listData.color === 'FF5733' && 'border-opa scale-110 transition-all !opacity-100'} `}></button>
                            <button  onClick={()=>colorSethandeler('33FF57')} className={` w-8 h-8 hover:opacity-90 transition-all bg-[#33FF57] opacity-40 rounded-md ${listData.color === '33FF57' && 'border-opa scale-110 transition-all !opacity-100'} `}></button>
                            <button  onClick={()=>colorSethandeler('3357FF')} className={` w-8 h-8 hover:opacity-90 transition-all bg-[#3357FF] opacity-40 rounded-md ${listData.color === '3357FF' && 'border-opa scale-110 transition-all !opacity-100'} `}></button>
                            <button  onClick={()=>colorSethandeler('FF33A1')} className={` w-8 h-8 hover:opacity-90 transition-all bg-[#FF33A1] opacity-40 rounded-md ${listData.color === 'FF33A1' && 'border-opa scale-110 transition-all !opacity-100'} `}></button>
                            <button  onClick={()=>colorSethandeler('33FFA1')} className={` w-8 h-8 hover:opacity-90 transition-all bg-[#33FFA1] opacity-40 rounded-md ${listData.color === '33FFA1' && 'border-opa scale-110 transition-all !opacity-100'} `}></button>
                            <button  onClick={()=>colorSethandeler('A133FF')} className={` w-8 h-8 hover:opacity-90 transition-all bg-[#A133FF] opacity-40 rounded-md ${listData.color === 'A133FF' && 'border-opa scale-110 transition-all !opacity-100'} `}></button>
                            <button  onClick={()=>colorSethandeler('FFA133')} className={` w-8 h-8 hover:opacity-90 transition-all bg-[#FFA133] opacity-40 rounded-md ${listData.color === 'FFA133' && 'border-opa scale-110 transition-all !opacity-100'} `}></button>
                        </div>
                    </ModalBody>
                    <ModalFooter>
                        <Button color="danger" variant="light" onPress={onClose}>
                        Close
                        </Button>
                        <Button color="primary" onPress={onClose} onClick={ceatingListHandeler}>
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