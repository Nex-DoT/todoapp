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
        return NextResponse.json({status:'failed' , message:'youre not logged in yet.'})
    }else{
        const token = cookie.split("=")[1];
        const result = await tokenVerify(token , secretKey as string) as any;
        if(result){
            try{
                await ConnectToDB();
            }catch{
                console.log('Could not connect to DB');  
            }
            const user = await User.findOne({email: result.email})
            const userInfo = { username: user.username , email:user.email}
            return NextResponse.json({status: 'success', message:'your token is valid' , userInfo})        
        }else{
            return NextResponse.json({status:'failed' , message:'your token is not valid'})
        }
    } 
}