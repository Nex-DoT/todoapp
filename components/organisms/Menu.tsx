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
import MiniBtnTheme from '../ui/mini-btn-theme';
import { context } from '@/context/context';

const Menu = ({ menuOpen, toggleMenu }:any) => {
    const { dispatch } = context();

    const signOutHandeler = async () => {
        const res = await fetch('api/auth/signout');
        const data = await res.json();
        if (data.status === 'success') {
            dispatch({ type: 'ADDEMAIL', payload: '' });
        }
    };

    const menuWidth = menuOpen ? 'w-80' : 'w-14';

    const data = DataNameMenu;
    return (
        <menu className={`overflow-hidden h-full ${menuWidth}  absolute z-20 transition-all bg-background2 p-4 md:relative`}>
            {menuOpen ? (
                <div className='w-full h-full flex flex-col items-center justify-between'>
                    {/* opened Menu */}
                    <div className='w-full'>
                        <Profile />
                        <div className={`absolute top-4 right-3`}>
                            <IconButton icon={<LuMenu />} onclick={toggleMenu} />
                        </div>
                        <SearchBar />
                        <MenuTask />
                        <hr className='border-opacity-30 border-primary-2' />
                        <ListTasks />
                    </div>
                    <div className='w-full'>
                        <ThemeToggleBtn />
                        <IconTextButton text='Sign Out' icon={<FaSignOutAlt />} onClick={signOutHandeler} name='' />
                    </div>
                </div>
            ) : (
                <div className={`opacity-0 transition-opacity ${!menuOpen && 'absolute top-0 left-0 w-full h-full z-30 p-1 bg-background2 opacity-100'}`}>
                    {/* closed Menu */}
                    <div className='w-full flex flex-col items-center justify-between pt-7 pb-7 h-full'>
                        <IconButton icon={<LuMenu />} onclick={toggleMenu} />
                        <div className='w-12'>
                            <MiniBtnTheme />
                            <IconButton icon={<FaSignOutAlt />} onclick={signOutHandeler} />
                        </div>
                    </div>
                </div>
            )}
        </menu>
    );
};

export default Menu;


