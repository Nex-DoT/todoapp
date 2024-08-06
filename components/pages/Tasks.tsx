'use client'
import React, { useState, useEffect, useContext } from 'react';
import Menu from '../organisms/Menu';
import TasksSection from '../organisms/TasksSection';

const Dashboard = () => {
    const [menuOpen, setMenuOpen] = useState(true);
    const toggleMenu = () => {
        setMenuOpen(!menuOpen);
    };

    return (
        <div className='w-full h-full flex'>
            <Menu menuOpen={menuOpen} toggleMenu={toggleMenu}/>
            <main className={`h-full w-full transition-all duration-300 ${menuOpen ? 'w-[calc(100%-20rem)]' : 'w-[calc(100%-3.5rem)]'} ml-12 md:${menuOpen ? 'w-[calc(100%-20rem)]' : 'w-[calc(100%-3.5rem)]'} md:ml-0`}>
                <section className="h-full bg-background1 w-full">
                    <TasksSection/>
                </section>
            </main>
        </div>
    );
};

export default Dashboard;
