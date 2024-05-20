'use client'
import TasksSection from "@/components/organisms/TasksSection";
import { useEffect } from "react";
import { tokenVerify } from "@/lib/utils";
import { cookies } from "next/headers";
import { useRouter } from "next/router";

export default function Home() {
    useEffect(()=>{
        fetch('api/auth/verify')
        .then((res) => res.json())
        .then((data)=>{if(data.status === 'failed') useRouter().replace('/signup',)})
    }, [ ])
    return (
        <section className="h-full bg-background1">
            <TasksSection/>
        </section>
    );
}
