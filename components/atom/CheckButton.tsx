import React, { useState } from 'react';
import { Checkbox } from "@nextui-org/checkbox";
import { Chip } from "@nextui-org/chip";
import { LuAlarmClock } from "react-icons/lu";
import { IoIosCalendar } from "react-icons/io";
import { CiCircleList } from "react-icons/ci";

interface CheckButtonProps {
    data?: {
        task: string;
        isImportant: boolean;
        isDone: boolean;
        time: string;
        date: string;
        list: string;
    };
}

const CheckButton: React.FC<CheckButtonProps> = ({ data }) => {
    if (!data) {
        console.error("Data is undefined or null.");
        return null;
    }

    const { task, isImportant, isDone, time, date, list } = data;

    const [icon, setIcon] = useState(isImportant);
    const [check, setCheck] = useState(isDone);

    const clickHandler = () => {
        setIcon(!icon);
    };

    return (
        <div className='w-full flex items-center justify-between h-14 hover:bg-background2 rounded-lg cursor-pointer transition-colors pl-3'>
            <Checkbox isSelected={check} onValueChange={setCheck} defaultSelected  lineThrough>
                <p>{task}</p>
            </Checkbox>
            <div className='flex items-center gap-3'>
                <Chip startContent={<LuAlarmClock size={17} />} variant="flat" color="primary" className='text-xs'>
                    {time}
                </Chip>
                <Chip startContent={<IoIosCalendar size={17} />} variant="flat" color="primary" className='text-xs'>
                    {date}
                </Chip>
                <Chip startContent={<CiCircleList size={17} />} variant="flat" color="primary" className='text-xs'>
                    {list}
                </Chip>
            </div>
        </div>
    );
};

export default CheckButton;
