'use client'
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import Title from '@/components/atom/Title';
import React from 'react';
import { createNote } from '@/lib/serverActions';
import { useState } from 'react';
import Nots from '@/components/atom/Nots';
import { CiCirclePlus } from "react-icons/ci";
import { context } from '@/context/context';
import {  Modal,   ModalContent, useDisclosure ,   ModalHeader,   ModalBody,   ModalFooter} from "@nextui-org/modal";
import TitleSection from '@/components/molecules/TitleSection';
import { useSession } from 'next-auth/react';
import { useTransition } from 'react';
const StickyNots = () => {
    const colors = ['FF5733', '33FF57', '3357FF', 'FF33A1', '33FFA1', 'A133FF', 'FFA133'];
    const {state , dispatch} = context();
    const [isPending , startTransition] = useTransition();
    const session = useSession()
    const email = session.data?.user?.email;
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [listData , setListData] = useState({
        name: 'NEW Note',
        description:'',
        color:'FF5733',
    })
    const colorSethandeler = (color:string)=>{
        setListData({...listData , color: color});
        console.log(listData);    
    }
    const inputHandeler = (e:any)=>{
        setListData({...listData , [e.target.name]: e.target.value});
        console.log(listData);
    }
    const ceatingListHandeler = async ()=>{
       
        if (email) {
            startTransition(() => {
              createNote( listData , email).then((fetchedData) => {
                console.log(fetchedData);
                dispatch( { type: 'ADDNOTE' , payload: fetchedData })
                setListData({
                    name: 'NEW Note',
                    description:'',
                    color:'FF5733',})
              }).catch((error) => {
                console.error("Failed to fetch data", error);
              });
            });
          }
         
    }
    // const path = window.location.pathname.split('/')[1];
    return (
        <div> 
            <TitleSection/>
            <div className='w-full h-full p-4 gap-5 flex-wrap flex items-center justify-start'>
                {state.notes.map( (note:any)=> <Nots key={note._id} data={note}/> )}
                <div className=' w-60 h-60 flex items-center justify-center bg-background2 hover:opacity-80 transition-opacity cursor-pointer relative before:absolute before:bg-background2 before:w-3 before:h-3 before:top-0 before:right-0 before:shadow-lg overflow-hidden' onClick={onOpen}>
                    <CiCirclePlus size={40}/>
                </div>
            </div>
            <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
                <ModalContent>
                {(onClose) => (
                    <>
                    <ModalHeader className="flex flex-col gap-1">Add sticky nots</ModalHeader>
                    <ModalBody>
                        <Input type='text'name='name' value={listData.name} onChange={inputHandeler} label='Note Name' size='sm'/>
                        <Input type='text'name='description' value={listData.description} onChange={inputHandeler} label='Description' size='sm'/>
                        <Title text='pick a color:' size={1} />
                        <div className='flex items-center justify-around'>
                            {colors.map((item:string)=> <button key={item} onClick={()=>colorSethandeler(`${item}`)} style={{ backgroundColor: `#${item}` }} className={` w-8 h-8 hover:opacity-90 transition-all bg-[#${item}] opacity-40 rounded-md ${listData.color === item && 'border-opa scale-110 transition-all !opacity-100'} `}></button> )}
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

export default StickyNots;