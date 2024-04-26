import React from 'react';
import Title from '../atom/Title';
import MenuItems from '../atom/MenuItems';
import { DataNameMenu } from '@/lib/MenuDataName';
const MenuTask = () => {
    const data = DataNameMenu;
    return (
        <div className='mb-4'>
            <Title text='TASKS' size={4}/>
            {
                data.map(item => <MenuItems text={item.name} icon={item.icon}/>)
            }
        </div>
    );
};

export default MenuTask;