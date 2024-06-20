import React from 'react';
import Title from '../atom/Title';
import MenuItems from '../atom/MenuItems';
import { DataNameMenu } from '@/lib/MenuDataName';
const MenuTask = () => {
    const data = DataNameMenu;
    const routeHandler = (e:any)=>{
        window.location.replace(e.target.name)
        console.log(e.target.name);
        
    }
    return (
        <div className='mb-4'>
            <Title text='TASKS' size={4}/>
            {
                data.map(item => <MenuItems key={item.name} text={item.name} icon={item.icon} name={item.route as string} onClick={routeHandler}/>)
            }
        </div>
    );
};

export default MenuTask;