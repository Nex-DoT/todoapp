import React from 'react';
import Title from '../atom/Title';
import MenuItems from '../atom/MenuItems';
import { DataNameMenu } from '@/lib/MenuDataName';
import Link from 'next/link';
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
                data.map(item => <Link key={item.name} href={item.route}><MenuItems  text={item.name} icon={item.icon} /></Link> )
            }
        </div>
    );
};

export default MenuTask;