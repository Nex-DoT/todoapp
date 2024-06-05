import { NextResponse , NextRequest } from "next/server";
import { ConnectToDB } from "@/lib/utils";
import List from "@/models/List";
import { tokenVerify } from "@/lib/utils";
export async function POST(req: NextRequest, res: NextResponse){
    try{
        await ConnectToDB();
    }catch(e){
        console.log({status:'400' , message:'Error to Connect to DB' , e});
    }
    const body = await req.json();
    
    const {name , color} = body;
    const requestHeaders = new Headers(req.headers);
    const cookie  = requestHeaders.get('cookie') as string;  
    const secretKey = process.env.SECRET_KEY;
    if(!cookie) return NextResponse.json({status:'failed' , message:'you shuold login first'})
    const token = cookie.split("=")[1];
    const tokenvalidetion = await tokenVerify( token , secretKey as string)
    if(!tokenvalidetion) return NextResponse.json({status:'failed' , message:'your token is not valid'})
    const {email} = tokenvalidetion ;
    const existing = await List.findOne({email , name})
    if(existing){
        return NextResponse.json({status:'failed' , message:'your list is already created'})
    }

    const newList = await List.create({email , name , color});
    console.log(newList);
    
    return NextResponse.json({status:'success' , newList})
}