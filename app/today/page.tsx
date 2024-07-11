'use client'
import React from 'react';
import CheckButton from '@/components/atom/CheckButton';
import { context } from '@/context/context';
import { useEffect } from 'react';
import TasksSection from '@/components/organisms/TasksSection';
const Today = () => {
    const {state , dispatch} = context();
    const date = new Date()
    const formattedDate = `${date.getFullYear()}-${date.getMonth() + 1}-${date.getDate()}`;
    const Today = [state.tasks.find( (item : any) => item.date === formattedDate)];
	useEffect(() => {
		const fetchData = async () => {
			if(state.email === '' && window.location.pathname !== '/signup'){
				try {
					const response = await fetch('api/auth/verify', {cache: 'no-store'});
					const data = await response.json();
					console.log(data);
					if(data.status === 'failed'){
						window.location.href = '/signup';
					} else {
						dispatch({type:'ADDEMAIL', payload: data.user.email });
						dispatch({type:'SETTASK', payload: data.user.task});
						dispatch({type:'SETLIST', payload: data.user.list});
						dispatch({type:'SETNOTE', payload: data.user.notes});
						dispatch({type:'SETUSERNAME', payload: data.user.username});
					}
				} catch (error) {
					console.error(error);
				}
			}
		};
	
		fetchData();
	}, [state.email, dispatch ]);
    return (
        <div className='w-full h-full'>
            <TasksSection/>
        </div>
    );
};

export default Today;