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
    const [task, setTask] = useState({
        tasks: [],
        complitedTask: [],
    });

    const path = window.location.pathname.split('/')[1];

    useEffect(() => {
        let newTasks = [];
        let newComplitedTask = [];
        
        if (path === '') {
            newTasks = state.tasks.filter((task: any) => !task.isDone);
            newComplitedTask = state.tasks.filter((task: any) => task.isDone);
        } else if (path === 'important') {
            newTasks = state.tasks.filter((task: any) => !task.isDone && task.isImportant);
            newComplitedTask = state.tasks.filter((task: any) => task.isDone && task.isImportant);
        } else if (path === 'today') {
            newTasks = state.tasks.filter((task: any) => !task.isDone && task.date === Today);
            newComplitedTask = state.tasks.filter((task: any) => task.isDone && task.date === Today);
        }

        // Check if the task state is actually changing to prevent unnecessary updates
        if (
            newTasks.length !== task.tasks.length ||
            newComplitedTask.length !== task.complitedTask.length ||
            !newTasks.every((t, i) => t === task.tasks[i]) ||
            !newComplitedTask.every((t, i) => t === task.complitedTask[i])
        ) {
            setTask({ tasks: newTasks, complitedTask: newComplitedTask });
        }
    }, [state, path]);

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
            <Editor />
        </div>
    );
};

export default TasksSection;
