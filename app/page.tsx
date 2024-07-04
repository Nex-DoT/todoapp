'use client'
import TasksSection from "@/components/organisms/TasksSection";
import { useRouter } from "next/navigation";
import { context } from "@/context/context";
import { useEffect } from "react";
export default function Home() {
    const router = useRouter()
	const {state , dispatch} = context();
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
        <section className="h-full bg-background1">
            <TasksSection/>
        </section>
    );
}
