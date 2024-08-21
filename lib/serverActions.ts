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
import { listType } from "@/types";

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

import { taskType } from "@/types";
export async function createTask(data:taskType){
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
        console.log('error in creasting the list');
    }
}

import { noteType } from "@/types";
export async function createNote(data:noteType , email:string){
    try{
        await ConnectToDB();
    }catch(e){
        console.error('Error in ConnectToDB', e);
        throw new Error('Error in ConnectToDB');
    }
    if (!data) return;
    if (!email) return;
    try{
        const createdNote = await Note.create({...data , email})
        const newNote = JSON.parse(JSON.stringify(createdNote));
        return newNote
    }catch(e){
        console.log('error in creasting the note');
    }
}


import { ObjectId } from 'mongodb'; // اضافه کردن این ایمپورت

export async function deleteTask(data: taskType) {
    try {
        await ConnectToDB();
    } catch (err) {
        console.error('Error in ConnectToDB', err);
        return { status: 'failed', message: 'Database connection failed.' };
    }

    if (!data || !data._id) {
        return { status: 'failed', message: 'No valid task ID provided.' };
    }

    try {
        const taskId = new ObjectId(data._id); // تبدیل ID به ObjectId

        const deleted = await Task.deleteOne({ _id: taskId }); // استفاده از ObjectId برای حذف

        if (deleted.deletedCount === 0) {
            return { status: 'failed', message: 'Task deletion failed or task not found.' };
        }
        return { status: 'ok', message: 'Task deleted successfully.' };
    } catch (e) {
        return { status: 'failed', message: 'Task deletion failed due to an error.' };
    }
}