'use server';

import Task from "@/models/Task";
import List from "@/models/List";
import Note from "@/models/Note";
import { ConnectToDB } from "./utils";

// Task Fetch
export async function dataFetch(email: string) {
    try {
        await ConnectToDB();
    } catch (err) {
        console.error('Error in ConnectToDB', err);
        throw new Error('Error in ConnectToDB');
    }

    if (!email) return;

    try {
        // Use Promise.all to fetch tasks, list, and note simultaneously
        const [tasksResult, listResult, noteResult] = await Promise.all([
            Task.find({ email }).lean(),
            List.find({ email }).lean(),
            Note.find({ email }).lean()
        ]);

        const tasks = tasksResult ? JSON.parse(JSON.stringify(tasksResult)) : [];
        const list = listResult ? JSON.parse(JSON.stringify(listResult)) : [];
        const note = noteResult ? JSON.parse(JSON.stringify(noteResult)) : [];

        return { tasks, list, note };
    } catch (err) {
        console.error('Error fetching data', err);
        throw new Error('Error fetching data');
    }
}
interface listType{
    color: string,
    name: string
}

export async function createList(email: string , data:listType){
    try {
        await ConnectToDB();
    } catch (err) {
        console.error('Error in ConnectToDB', err);
        throw new Error('Error in ConnectToDB');
    }

    if (!email) return;
    if (!data) return;
    try{
        const createdList = await List.create({ email: email , name: data.name , color:data.color});
        const newList = createdList ? JSON.parse(JSON.stringify(createdList)):[];
        return newList;
    }catch(e){
        console.log('error in creating the list');
        
    }
}

export async function createTask(data:any){
    try {
        await ConnectToDB();
    } catch (err) {
        console.error('Error in ConnectToDB', err);
        throw new Error('Error in ConnectToDB');
    }
    if (!data) return;
    try{
        const createdTask = await Task.create({...data , isDone:false});
        const newTask = createdTask ? JSON.parse(JSON.stringify(createdTask)):[];
        return newTask;
    }catch(e){
        console.log('error in creasting the task')
    }
}