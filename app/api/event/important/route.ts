import { ConnectToDB } from "@/lib/utils";
import { NextRequest, NextResponse } from "next/server";
import Task from "@/models/Task";
export async function PATCH(req:NextRequest , res:NextResponse){
    const body = await req.json();
    try{
        await ConnectToDB();
    }catch(err){
        return NextResponse.json({status:'failed', message: 'error in connect to database'})
    }
    const {_id }= body;
    console.log(body);
    
    const taskUpdate = await Task.findByIdAndUpdate( _id,
                                                     {$set : body} ,
                                                     {new:true , runValidators: true});
    
    return NextResponse.json({status:'200' , message:'Task update successfully', taskUpdate})
}