import React, { useEffect, useState } from 'react';
import { Checkbox } from "@nextui-org/checkbox";
import { LuAlarmClock } from "react-icons/lu";
import { IoIosCalendar } from "react-icons/io";
import { CiCircleList } from "react-icons/ci";
import { context } from '@/context/context';
import IconButton from './IconButton';
import { FaRegStar, FaStar } from "react-icons/fa";

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
    
    // تعریف اولیه state ها بدون شرایط
    const [icon, setIcon] = useState(data.isImportant);
    const [check, setCheck] = useState(data.isDone);

    // تعریف useEffect بدون شرط
    useEffect(() => {
        setCheck(data.isDone);
        if (window.location.pathname === '/important') {
            setIcon(data.isImportant);
        }
    }, [data.isDone, data.isImportant, window.location.pathname]);

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
    };

    const clickHandler = async () => {
        setIcon(!icon);
        try {
            const res = await fetch('api/event/important', {
                method: 'PATCH',
                body: JSON.stringify({ ...data, isImportant: !icon }),
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
    };

    return (
        <div onClick={() => dispatch({ type: "SETEDITOR", payload: data })} className='w-full flex items-start pt-2 md:items-center md:pt-0 justify-between h-16 relative hover:bg-background2 rounded-lg cursor-pointer transition-colors pl-3 md:h-14'>
            <Checkbox isSelected={check} onValueChange={changeTheCheck} lineThrough>
                <p>{data.task}</p>
            </Checkbox>
            <div className='flex items-center justify-between' >
                <div className='flex items-center gap-3 absolute bottom-1 opacity-60 left-10 md:relative  w-72'>
                    <div className='text-xs flex items-center gap-1 relative before:absolute before:-right-2 before:h-4 before:w-[1px] before:bg-slate-500 '>
                        <LuAlarmClock size={15} />
                        {data.time}
                    </div>
                    <div className='text-xs flex items-center gap-1 relative before:absolute before:-right-2 before:h-4 before:w-[1px] before:bg-slate-500 '>
                        <IoIosCalendar size={15} />
                        {data.date}
                    </div>
                    <div className='text-xs flex items-center gap-1'>
                        <CiCircleList size={15} />
                        {data.list}
                    </div>
                </div>
                <IconButton onclick={clickHandler} icon={icon ? <FaStar /> : <FaRegStar />} />
            </div>
        </div>
    );
};

export default CheckButton;
