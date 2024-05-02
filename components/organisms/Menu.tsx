"use client"
import React, { useState } from 'react';
import Profile from '../molecules/Profile';
import { LuMenu } from 'react-icons/lu';
import IconButton from '../atom/IconButton';
import SearchBar from '../atom/SearchBar';
import ThemeToggleBtn from '../ui/theme-switch';
import MenuTask from '../molecules/MenuTask';
import { DataNameMenu } from '@/lib/MenuDataName';
import ListTask from '../atom/ListTask';
import ListTasks from '../molecules/ListTasks';
import IconTextButton from '../atom/IconTextButton';
import { FaSignOutAlt } from 'react-icons/fa';

const Menu = () => {
    const [menu, setMenu] = useState(true);

    const menuHandler = () => {
        setMenu(!menu);
    };

    const menuWidth = menu ? 'w-96' : 'w-10';

    const data = DataNameMenu;
    return (
        <menu
            className={` overflow-hidden h-full ${menuWidth} relative flex flex-col items-start justify-between pt-7 transition-all bg-background2 p-6`}
        >
            <div className='w-full'>
                <Profile />
                <div className={` opacity-0 transition-opacity ${!menu && 'absolute top-0 w-full h-full z-30 bg-background2 opacity-100'}`}></div>
                <div className={`absolute top-8 right-3 ${!menu && ' !right-0 z-50'}`}>
                    <IconButton icon={<LuMenu />} onclick={menuHandler} />
                </div>
                <SearchBar />
                <MenuTask />
                <hr className=' border-opacity-30 border-primary-2' />
                <ListTasks />
            </div>
            <div className='w-full'>
                <ThemeToggleBtn />
                <IconTextButton text='Sign Out' icon={<FaSignOutAlt />} />
            </div>
        </menu>
    );
};

export default Menu;

