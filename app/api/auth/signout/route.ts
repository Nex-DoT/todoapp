var cookie = require("cookie");
import { NextRequest , NextResponse } from "next/server";
export async function GET(){

    return NextResponse.json(
        {status:'success' , message:'Sign-Out successful' } ,
        { headers:{'Set-Cookie' : cookie.serialize('token' , '' , {httpOnly:true , maxAge:0 , path:'/'})}});
}