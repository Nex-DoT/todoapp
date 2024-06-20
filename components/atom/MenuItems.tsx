import React from 'react';
import Icon from './Icon';
import Title from './Title';
import { Button } from '@nextui-org/button';
import { MenuItemType } from '@/types';
import TaskCounter from './TaskCounter';
const MenuItems = ({text , icon , name , onClick }:MenuItemType) => {
    return (
        <Button 
            variant={'light'}
            className='w-full flex items-center justify-between'
            name={name}
            onClick={onClick}
            endContent={
                <TaskCounter/>
            }
        >   
            <div className='flex items-center justify-center  gap-2'>
                 <Icon icon={icon}/>
                 <Title text={text} size={2}/>
            </div>
        </Button>
    );
};

export default MenuItems;