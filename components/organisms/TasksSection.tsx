'use client'
import React, { useEffect, useState } from 'react';
import Editor from '../molecules/Editor';
import { context } from '@/context/context';
import InputTask from '../molecules/InputTask';
import TitleSection from '../molecules/TitleSection';
import TaskSection from '../molecules/TaskSection';

const date = new Date();
const Today = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

const TasksSection = () => {
    const { state } = context();
    const [open, setOpen] = useState(false);
    const [task, setTask] = useState({
        tasks: [],
        completedTask: [],
    });

    const path = window.location.pathname.split('/')[1];
    
    useEffect(() => {
        if (state.editor.task === '') {
            setOpen(false);
        } else {
            setOpen(true);
        }
    }, [state.editor.task]);

    useEffect(() => {
        const filterTasks = () => {
            let tasks = [];
            let completedTask = [];

            if (path === '') {
                tasks = state.tasks.filter((task: any) => !task.isDone);
                completedTask = state.tasks.filter((task: any) => task.isDone);
            } else if (path === 'important') {
                tasks = state.tasks.filter((task: any) => !task.isDone && task.isImportant);
                completedTask = state.tasks.filter((task: any) => task.isDone && task.isImportant);
            } else if (path === 'today') {
                tasks = state.tasks.filter((task: any) => !task.isDone && task.date === Today);
                completedTask = state.tasks.filter((task: any) => task.isDone && task.date === Today);
            }
            
            setTask({ tasks, completedTask });
        };

        filterTasks();
    }, [state.tasks, path]);

    return (
        <div className='h-full w-full flex'>
            <div className='h-full flex flex-col items-center justify-between w-full'>
                <div className='w-full'>
                    <TitleSection path={path} />
                    <TaskSection tasks={task} />
                </div>
                <div className='w-full relative pl-6 pr-6'>
                    <InputTask />
                </div>
            </div>
            {state.editor.task && open && <Editor open={setOpen} />}
        </div>
    );
};

export default TasksSection;
