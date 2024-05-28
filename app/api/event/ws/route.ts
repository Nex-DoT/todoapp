import { NextRequest , NextResponse } from "next/server";
import List from "@/models/List";
import Task from "@/models/Task";
import { ConnectToDB } from "@/lib/utils";
import { tokenVerify } from "@/lib/utils";

export async function handeler(req: NextRequest , res: NextResponse){
  const header = new Headers(req.headers);
  const cookie = header.get('cookie') as string;
  const secretKey = process.env.SECRET_KEY as string;
  if(!cookie) {return NextResponse.json({status:'failed' , message:'dude just login into website , is that so hard?!'})}
    try{
      await ConnectToDB();
    }catch(e){
      return NextResponse.json({status:'failed' , message:'error in connection to database'})
    }
    const token = cookie.split('=')[1];
    const verify = tokenVerify(token , secretKey );
    if(!verify) {return NextResponse.json({status:'failed' , message:'pls login again'})}

    //web socket conection :
}