'use client'
import React from 'react';
import { Calendar } from '../ui/calendar';
import { LuAlarmClock } from "react-icons/lu";
import { Button } from '@nextui-org/button';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
  } from "@/components/ui/popover"
const Clock = () => {
    const [date, setDate] = React.useState<Date>()

    return (
        <Popover >
        <PopoverTrigger asChild>
          <Button
            variant={'light'}
            className={`flex bg-background2 w-44 `
            }
          >
            <div className={`flex ${date && 'flex-col text-xs items-center justify-center gap-1'}`}>
              <LuAlarmClock className="h-4 w-4 mr-2" />
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 mb-7 mr-3 border-none animate-appearance-in">
          <div className='bg-background2  relative before:absolute before:rotate-45 before:w-7 before:h-7 before:-bottom-2 before:bg-background2 before:left-28 rounded-lg'>
            
          </div>
        </PopoverContent>
      </Popover>
    );
};

export default Clock;