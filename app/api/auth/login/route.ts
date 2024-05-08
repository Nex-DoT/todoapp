import { ConnectToDB, unHashPassword } from "@/lib/utils";
import User from "@/models/User";
import { NextResponse } from "next/server";
var jwt = require('jsonwebtoken');
export async function POST( req:Request){
    const expiration = 60 * 60 * 24 * 7;
    const secretKey = process.env.SECRET_KEY
    try{
        await ConnectToDB();
    }catch{
        console.log("Failed to connect to DB");
        return NextResponse.json({status: 'failed' , message:'Failed to connect to DB'});
    }

    const body = await req.json();
    if(!body.email || !body.password ){
        return NextResponse.json({status:'failed' , message:' your data is invalid'})
    }
    const user = await User.findOne({email:body.email});
    if(!user){
        return NextResponse.json({status:'failed' , message:'you are not signed up yet.'});
    }
    const validationPASS = await unHashPassword(body.password , user.password);
    if(!validationPASS){
        return NextResponse.json({status:'failed' , message:'username or password is invalid'})
    }
    const email = body.email;
    const token = jwt.sign({email} , secretKey , {expisedIn:expiration} );
}