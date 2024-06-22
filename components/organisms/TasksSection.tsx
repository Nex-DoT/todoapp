'use client'
import React from 'react';
import Editor from '../molecules/Editor';
import { context } from '@/context/context';
import { useEffect , useState } from 'react';
import InputTask from '../molecules/InputTask';
import TitleSection from '../molecules/TitleSection';
import TaskSection from '../molecules/TaskSection';
const date = new Date()
// const Today = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
const Today = `${date.getFullYear()}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getDate().toString().padStart(2, '0')}`;
const TasksSection = () => {
    const { state , dispatch } = context();
    const [task, setTask] = useState({
        tasks: [],
        complitedTask: [],
    });
    console.log(state.tasks[0]);
    
    const path = window.location.pathname.split('/')[1];
    useEffect(() => {
        if(path === ''){
            setTask({
                tasks: state.tasks.filter((task: any) => !task.isDone ),
                complitedTask: state.tasks.filter((task: any) => task.isDone),
            });
        }else if(path === 'important'){
            setTask({
                tasks: state.tasks.filter((task:any) => !task.isDone && task.isImportant) ,
                complitedTask: state.tasks.filter((task:any)=> task.isDone && task.isImportant)
            })
        }else if(path === 'today'){
            setTask({
                tasks: state.tasks.filter((task:any)=> !task.isDone && task.date === Today ),
                complitedTask: state.tasks.filter((task:any)=> task.isDone && task.date === Today ),
            })
        }
        console.log(task);
        
    }, [state ]);
    
    return (
        <div className='h-full w-full flex'>
            <div className='h-full flex flex-col items-center justify-between w-full'>
                <div className='w-full'>
                    <TitleSection path={path}/>
                    <TaskSection tasks={task}/>
                </div>
                <div className='w-full relative pl-6 pr-6'>
                    <InputTask/>
                </div>
            </div>
            <Editor/>
        </div>
    );
};

export default TasksSection;