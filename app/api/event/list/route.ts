import { NextResponse , NextRequest } from "next/server";
import { ConnectToDB } from "@/lib/utils";
import List from "@/models/List";
export async function POST(req: NextRequest, res: NextResponse){
    try{
        await ConnectToDB();
    }catch(e){
        console.log({status:'400' , message:'Error to Connect to DB' , e});
    }
    const body = await req.json();
    const [email , name , color] = body;

    const existing = await List.findOne({email , name})
    if(existing){
        return NextResponse.json({status:'failed' , message:'your list is already created'})
    }

    const newList = await List.create({email , name , color});

    return NextResponse.json({status:'success' , message:'list created successfully'})
}