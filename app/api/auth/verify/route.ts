import { NextResponse, NextRequest } from "next/server";
import { ConnectToDB } from "@/lib/utils";
import { tokenVerify } from "@/lib/utils";
import List from "@/models/List";
import Task from "@/models/Task";

export async function GET(req: NextRequest, res: NextResponse) {
    try {
        const requestHeaders = new Headers(req.headers);
        const cookie = requestHeaders.get('cookie');
        
        if (!cookie) {
            return NextResponse.json({ status: 'failed', message: 'No cookie provided' });
        }

        const token = cookie.split('=')[1];
        const secretKey = process.env.SECRET_KEY;

        if (!secretKey) {
            return NextResponse.json({ status: 'failed', message: 'Secret key not found' });
        }

        const verify = await tokenVerify(token, secretKey);
        
        if (!verify) {
            return NextResponse.json({ status: 'failed', message: 'Please login first' });
        }

        try {
            await ConnectToDB();
        } catch (e) {
            console.error('Error connecting to DB:', e);
            return NextResponse.json({ status: 'failed', message: 'Error in connecting to DB' });
        }

        const user = {
            list: await List.find({ email: verify.email }).catch(e => { throw new Error('Error fetching lists') }),
            task: await Task.find({ email: verify.email }).catch(e => { throw new Error('Error fetching tasks') }),
            email: verify.email
        }

        return NextResponse.json({ status: 'success', message: 'Welcome Back', user });
    } catch (e) {
        console.error('Error:', e);
        return NextResponse.json({ status: 'failed', message: 'An error occurred', error: e });
    }
}
