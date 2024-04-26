'use client'
import React from 'react';
import calendar
  const Calander = () => {
    const [date, setDate] = React.useState<Date>()

    return (
        <Popover >
        <PopoverTrigger asChild>
          <Button
            variant={'clear'}
            className={`flex bg-background2 w-44 `
            }
          >
            <div className={`flex ${date && 'flex-col text-xs items-center justify-center gap-1'}`}>
              <FaCalendarDays className="h-4 w-4 mr-2" />
              {date ? format(date, "PPP") : <span>Calender</span>}
            </div>
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 mb-7 mr-3 border-none animate-appearance-in">
          <Calendar
            mode="single"
            selected={date}
            onSelect={setDate}
            initialFocus
            className='bg-background2  relative before:absolute before:rotate-45 before:w-7 before:h-7 before:-bottom-2 before:bg-background2 before:left-28 rounded-lg'
          />
        </PopoverContent>
      </Popover>
    );
};

export default Calander;