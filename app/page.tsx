'use client'
import TasksSection from "@/components/organisms/TasksSection";
import { useEffect } from "react";
import { context } from "@/context/context";
export default function Home() {
  const {state , dispatch} = context();
      useEffect(()=>{
        if(state.email ===''){
          fetch('api/auth/verify')
          .then((res) => res.json())
          .then((data)=>{ console.log(data);
          if(data.status === 'failed'){
            window.location.href= '/signup'
          } else{
            dispatch({type:'ADDEMAIL' , payload: data.userInfo.email })
            console.log(state);
            
          } })
        }
    }, [])
    return (
        <section className="h-full bg-background1">
            <TasksSection/>
        </section>
    );
}
