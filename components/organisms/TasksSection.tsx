'use client'
import React, { useEffect, useState } from 'react';
import Editor from '../molecules/Editor';
import { context } from '@/context/context';
import InputTask from '../molecules/InputTask';
import TitleSection from '../molecules/TitleSection';
import TaskSection from '../molecules/TaskSection';
import { useRouter , usePathname } from 'next/navigation';
import { taskType } from '@/types';
const date = new Date();
const Today = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;

const TasksSection = () => {
    
    const { state } = context();
    const [open, setOpen] = useState(false);
    const [task, setTask] = useState({
        tasks: [],
        completedTask: [],
    });
    const route = Object.keys(state.activeRoute).find(key => state.activeRoute[key] === true);
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

            if (route === 'task') {
                tasks = state.tasks.filter((task: taskType) => !task.isDone);
                completedTask = state.tasks.filter((task: taskType) => task.isDone);
            } else if (route === 'important') {
                tasks = state.tasks.filter((task: taskType) => !task.isDone && task.isImportant);
                completedTask = state.tasks.filter((task: taskType) => task.isDone && task.isImportant);
            } else if (route === 'today') {
                tasks = state.tasks.filter((task: taskType) => !task.isDone && task.date === Today);
                completedTask = state.tasks.filter((task: taskType) => task.isDone && task.date === Today);
            }
            
            setTask({ tasks, completedTask });
            console.log('Tasks:', tasks);
            console.log('Completed Tasks:', completedTask);
        };

        filterTasks();
    }, [state.tasks, route]);

    return (
        <div className='h-full w-full flex relative'>
            <div className='h-full flex flex-col items-center justify-between w-full'>
                <div className='w-full'>
                    <TitleSection />
                    <TaskSection tasks={task} />
                </div>
                <div className='w-full relative pr-3 pl-3'>
                    <InputTask />
                </div>
            </div>
            {state.editor.task && open && <Editor open={setOpen} />}
        </div>
    );
};

export default TasksSection;
