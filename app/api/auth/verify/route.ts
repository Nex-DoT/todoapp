import { NextRequest , NextResponse } from "next/server";
import { tokenVerify } from "@/lib/utils";
import User from "@/models/User";
import { ConnectToDB } from "@/lib/utils";
export async function GET(req: NextRequest, res: NextResponse) {
    const requestHeaders = new Headers(req.headers);
    const cookie  = requestHeaders.get('cookie') as string;  
    const secretKey = process.env.SECRET_KEY;
    console.log(cookie);
    if(!cookie){
        return NextResponse.json({status:400 , message:'youre not logged in yet.'})
    }else{
        const token = cookie.split("=")[1];
        try{
            await ConnectToDB();
        }catch{
            console.log('Could not connect to DB');  
        }
        const result = await tokenVerify(token , secretKey as string) as any;
        const user = await User.findOne({email: result.email})
        const userInfo = { username: user.username , email:user.email}
        return NextResponse.json({status: 200, message:'your token is valid' , userInfo})        
    } 
}