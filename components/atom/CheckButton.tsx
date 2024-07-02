import React, { useEffect, useState } from 'react';
import { Checkbox } from "@nextui-org/checkbox";
import { LuAlarmClock } from "react-icons/lu";
import { IoIosCalendar } from "react-icons/io";
import { CiCircleList } from "react-icons/ci";
import { context } from '@/context/context';

interface CheckButtonProps {
    data: {
        task: string;
        isImportant: boolean;
        isDone: boolean;
        time: string;
        date: string;
        list: string;
    };
}

const CheckButton: React.FC<CheckButtonProps> = ({ data }) => {
    const { state, dispatch } = context();
    if (!data) {
        console.error("Data is undefined or null.");
        return null;
    }
    const { task, isImportant, isDone, time, date, list } = data;
    const [icon, setIcon] = useState(isImportant);
    const [check, setCheck] = useState(isDone);
    
    useEffect(()=>{
        setCheck(isDone)
    },[state])
    const changeTheCheck = async () => {
        setCheck(!check); // ابتدا وضعیت چک‌باکس را تغییر دهید تا انیمیشن اجرا شود

        try {
            const res = await fetch('api/event/task', {
                method: 'PATCH',
                body: JSON.stringify({ ...data, isDone: !check }),
                headers: { 'Content-Type': 'application/json' }
            });

            if (!res.ok) {
                console.error('Error:', res.statusText);
                return;
            }

            const newData = await res.json();
            console.log('Updated Task:', newData);
            dispatch({ type: 'UPDATETASK', payload: newData.taskUpdate });
        } catch (error) {
            console.error('Error parsing JSON:', error);
        }
    }

    const clickHandler = () => {
        setIcon(!icon);
    };

    return (
        <div onClick={() => dispatch({ type: "SETEDITOR", payload: data })} className='w-full flex items-center justify-between h-16 relative hover:bg-background2 rounded-lg cursor-pointer transition-colors pl-3 md:h-14'>
            <Checkbox isSelected={check} onValueChange={changeTheCheck} lineThrough>
                <p>{task}</p>
            </Checkbox>
            <div className='flex items-center gap-3 absolute bottom-0 opacity-60 left-10 md:relative w-80'>
                <div className='text-xs flex items-center gap-1 relative before:absolute before:-right-2 before:h-4 before:w-[1px] before:bg-slate-500'>
                    <LuAlarmClock size={17} />
                    {time}
                </div>
                <div className='text-xs flex items-center gap-1 relative before:absolute before:-right-2 before:h-4 before:w-[1px] before:bg-slate-500'>
                    <IoIosCalendar size={17} />
                    {date}
                </div>
                <div className='text-xs flex items-center gap-1'>
                    <CiCircleList size={17} />
                    {list}
                </div>
            </div>
        </div>
    );
};

export default CheckButton;

