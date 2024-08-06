import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { ConnectToDB } from "@/lib/utils";
import User from "@/models/User";
import { verifyPassword } from "@/lib/utils";

const authOptions = {
    session: {strategy: 'jwt'},
    providers:[
        CredentialsProvider({
            async authorize( credentials ){
                const {email , password} = credentials;
                if(!email || !password) return null;
                try{
                    await ConnectToDB();
                }catch(e){
                    throw new Error('Could not connect to DB');
                }
                
                const existingUser = await User.findOne({email})
                if(!existingUser) throw new Error('please sign in first');
                
                const veriftPass = await verifyPassword(password , existingUser.password)
                if(!veriftPass) throw new Error('wrong information') ;
                return {
                    email: existingUser.email,
                    name: existingUser.username
                }
            }
        })
    ],
    callbacks:{
        async redirect({url , baseUrl}){
                if (url === '/api/auth/signin') {
                  return `${baseUrl}/dashboard`;
                }
                if (url === '/api/auth/signout') {
                  return baseUrl;
                }
                return baseUrl;
        }
    },
}

const handeler = NextAuth(authOptions)

export {handeler as POST , handeler as GET}