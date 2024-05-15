import { NextResponse , NextRequest } from "next/server";
import { ConnectToDB } from "@/lib/utils";
import Task from "@/models/Task";
export async function POST( req: NextRequest, res: NextResponse) {
    try{
        await ConnectToDB();
    }catch(err){
        console.log({message:'Error to connect to server' , err});
    }
    const body = await req.json();
    const [email , clock , listName , taskName , calendar] = body
    if(body.email === "" , body.TaskName==="" , body.listName === "" , body.clock==="" , body.calendar === "" ){
        return NextResponse.json({message: 'your data is not valid' , status: '400'})
    }

    const task = await Task.create({email: {email} ,taskname:{taskName}, clock: {clock} , listName: {listName} , calendar:{calendar}});
    return NextResponse.json({status:'200' , message:' your Task is successfully created.'})
}