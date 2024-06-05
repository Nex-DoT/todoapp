'use client'
import TasksSection from "@/components/organisms/TasksSection";
import { useEffect } from "react";
import { context } from "@/context/context";
export default function Home() {
  const {state , dispatch} = context();
  useEffect(() => {
      const fetchData = async () => {
          if(state.email === ''){
              try {
                  const response = await fetch('api/auth/verify');
                  const data = await response.json();
                  console.log(data);
                  if(data.status === 'failed'){
                      window.location.href = '/signup';
                  } else {
                      dispatch({type:'ADDEMAIL', payload: data.user.email });
                      dispatch({type:'SETTASK', payload: data.user.task});
                      dispatch({type:'SETLIST', payload: data.user.list});
                  }
              } catch (error) {
                  console.error(error);
              }
          }
      };
  
      fetchData();
  }, [state.email, dispatch]);
    return (
        <section className="h-full bg-background1">
            <TasksSection/>
        </section>
    );
}
