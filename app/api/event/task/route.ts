import { NextResponse , NextRequest } from "next/server";
import { ConnectToDB } from "@/lib/utils";
import Task from "@/models/Task";
import { tokenVerify } from "@/lib/utils";
export async function POST( req: NextRequest, res: NextResponse) {
    const requestHeaders = new Headers(req.headers);
    const cookie  = requestHeaders.get('cookie') as string;  
    const secretKey = process.env.SECRET_KEY;
    if(!cookie) return NextResponse.json({status:'failed' , message:'you shuold login first'})
    const token = cookie.split("=")[1];
    const tokenvalidetion = await tokenVerify( token , secretKey as string)
    if(!tokenvalidetion) return NextResponse.json({status:'failed' , message:'your token is not valid'})
    const {email} = tokenvalidetion ;
    try{
        await ConnectToDB();
    }catch(err){
        console.log({message:'Error to connect to server' , err});
    }
    const body = await req.json();
    const {time , list , task , date , description , isImportant} = body
    const datas = {...body}
    console.log(datas);
    
    if(body.task==="" || body.time==="" || body.date === "" ){
        return NextResponse.json({message: 'your data is not valid' , status: '400'})
    }

    const newTask = await Task.create({email , time , list , task , date , description , isImportant ,  isDone:false,});
    return NextResponse.json({status:'200' , message:' your Task is successfully created.', newTask})
}