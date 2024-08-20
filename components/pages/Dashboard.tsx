'use client'
import React, { useState, useEffect, useContext } from 'react';
import Menu from '../organisms/Menu';
import TasksSection from '../organisms/TasksSection';
import { context } from '@/context/context';
// const ToastContainer = require('react-toastify')
import { ToastContainer, toast } from 'react-toastify';
import StickyNots from '../organisms/StickyNote';
const Dashboard = () => {
  const {state} = context()
  const [menuOpen, setMenuOpen] = useState(true);
  const route = Object.keys(state.activeRoute).find(key => state.activeRoute[key] === true);
    
  const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };
    return (
        <div className='w-full h-full flex'>
            <Menu menuOpen={menuOpen} toggleMenu={toggleMenu}/>
            <main className={`h-full w-full transition-all duration-300 ${menuOpen ? 'w-[calc(100%-20rem)]' : 'w-[calc(100%-3.5rem)]'} ml-12 md:${menuOpen ? 'w-[calc(100%-20rem)]' : 'w-[calc(100%-3.5rem)]'} md:ml-0`}>
                <section className={`h-full bg-background1 transition-opacity w-full ${menuOpen && 'opacity-20'} md:opacity-100 `}>
                    {route === 'stickyNots' ? <StickyNots/> : <TasksSection/>}
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
