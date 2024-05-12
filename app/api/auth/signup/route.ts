import { NextResponse } from "next/server";
import { NextRequest } from "next/server";
import { ConnectToDB } from "@/lib/utils";
import User from "@/models/User";
import { hashPassword } from "@/lib/utils";
export async function POST( req: NextRequest){
    try{
        await ConnectToDB();
        console.log('Connected to DB');
        
    }catch{
        console.log("Error in connecting to DB")
        return NextResponse.json({ status:'500' , message:'Error connecting to DB'});
    }
    const body = await req.json();
    console.log(body);
    
    if(!body.username || !body.password || !body.email ){
        return NextResponse.json({ status:'500' , message:'your data is not valid' });
    }
    const existing = await User.findOne({email:body.email});
    console.log(existing);
    
    if(existing){
        return NextResponse.json({ status:'402' , message:'User already exists' });
    }else{
        const hashPass = await hashPassword(body.password);
        const newUser = await User.create({username:body.username , email:body.email , password:hashPass , createdAt:new Date})
        return NextResponse.json({ status:'200' , message:'User created successfully' , user:newUser});
    }
}