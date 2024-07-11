'use client'
import { Button } from '@nextui-org/button';
import { Input } from '@nextui-org/input';
import Title from '@/components/atom/Title';
import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import Nots from '@/components/atom/Nots';
import { CiCirclePlus } from "react-icons/ci";
import { context } from '@/context/context';
import {  Modal,   ModalContent, useDisclosure ,   ModalHeader,   ModalBody,   ModalFooter} from "@nextui-org/modal";
import TitleSection from '@/components/molecules/TitleSection';
const Sticky = () => {
    const {state , dispatch} = context();
    const {isOpen, onOpen, onOpenChange} = useDisclosure();
    const [listData , setListData] = useState({
        name: 'NEW Note',
        description:'',
        color:'FF5733',
    })
    useEffect(() => {
		const fetchData = async () => {
			if(state.email === '' && window.location.pathname !== '/signup'){
				try {
					const response = await fetch('api/auth/verify', {cache: 'no-store'});
					const data = await response.json();
					console.log(data);
					if(data.status === 'failed'){
						window.location.href = '/signup';
					} else {
						dispatch({type:'ADDEMAIL', payload: data.user.email });
						dispatch({type:'SETTASK', payload: data.user.task});
						dispatch({type:'SETLIST', payload: data.user.list});
						dispatch({type:'SETNOTE', payload: data.user.notes});
						dispatch({type:'SETUSERNAME', payload: data.user.username});
					}
				} catch (error) {
					console.error(error);
				}
			}
		};
	
		fetchData();
	}, [state.email, dispatch ]);
    const colorSethandeler = (color:string)=>{
        setListData({...listData , color: color});
        console.log(listData);    
    }
    const inputHandeler = (e:any)=>{
        setListData({...listData , [e.target.name]: e.target.value});
        console.log(listData);
    }
    const ceatingListHandeler = async ()=>{
        try {
            const res = await fetch('/api/event/note', {
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
                if(newdata.status === 'success'){
                    dispatch( { type: 'ADDNOTE' , payload: newdata.note })
                }
            } catch (e) {
                console.error('Error parsing JSON response:', e);
                return;
            }
            console.log(newdata);
        } catch (error) {
            console.error('Error fetching data:', error);
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

export default Sticky;