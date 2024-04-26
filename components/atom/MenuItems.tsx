import React from 'react';
import Icon from './Icon';
import Title from './Title';
import { Button } from '@nextui-org/button';
import { MenuItemType } from '@/types';
import TaskCounter from './TaskCounter';
const MenuItems = ({text , icon}:MenuItemType) => {
    return (
        <Button 
            variant={'clear'}
            className='w-full flex items-center justify-between'
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