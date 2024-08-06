'use client'
import React from 'react';
import { useState } from 'react';
import { useTransition } from 'react';
import { useSession } from 'next-auth/react';
import Title from '../atom/Title';
import ListTask from '../atom/ListTask';
import IconTextButton from '../atom/IconTextButton';
import { Button } from '@nextui-org/button';
import { createList } from '@/lib/serverActions';
import {ScrollShadow} from "@nextui-org/scroll-shadow";
import { FaPlus } from "react-icons/fa";
import { Input } from '@nextui-org/input';
import {  Modal,   ModalContent, useDisclosure ,   ModalHeader,   ModalBody,   ModalFooter} from "@nextui-org/modal";
import { context } from '@/context/context';
const colors = ['FF5733', '33FF57', '3357FF', 'FF33A1', '33FFA1', 'A133FF', 'FFA133'];

const ListTasks =  () => {
    const {state , dispatch} =  context();
    const [isPending, startTransition] = useTransition();
    const session = useSession();
    const email = session.data?.user?.email
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
        if (email) {
            startTransition(() => {
              createList(email , listData).then((fetchedData) => {
                console.log(fetchedData);
                dispatch( { type: 'ADDLIST' , payload: fetchedData})
              }).catch((error) => {
                console.error("Failed to fetch data", error);
              });
            });
          }
    }
    return (
        <div>
            <Title text='LIST' size={4}/>
            <ScrollShadow
            hideScrollBar 
            // offset={100}
            // orientation="horizontal" 
            className="w-full  max-h-[200px]">
                <div>
                    {
                        state.list.map((item:any) => <ListTask key={item.name} name={item.name}  color={`#${item.color}`}/>)
                    }
                </div>
            </ScrollShadow>
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
                            {colors.map((item:string)=> <button  onClick={()=>colorSethandeler(`${item}`)} className={` w-8 h-8 hover:opacity-90 transition-all bg-[#${item}] opacity-40 rounded-md ${listData.color === item && 'border-opa scale-110 transition-all !opacity-100'} `}></button> )}
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