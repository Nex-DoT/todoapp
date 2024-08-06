import React from 'react';
import Icon from './Icon';
import Title from './Title';
import { Button } from '@nextui-org/button';
import { MenuItemType } from '@/types';
import { context } from '@/context/context';
import TaskCounter from './TaskCounter';
const MenuItems = ({text , icon , route}:MenuItemType) => {
    const {dispatch , state} = context();
    const clickHandeler=() => {
        dispatch({type:'ACTIVE' , payload:route})
    };
    return (
        <Button 
            onClick={clickHandeler}
            variant={state.activeRoute[route] ? 'flat' : 'light'}
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