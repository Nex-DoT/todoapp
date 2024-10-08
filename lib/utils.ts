import mongoose from "mongoose";

export async function ConnectToDB() {
  try {
    if (mongoose.connection.readyState === 1) {
      console.log('Already connected to DB');
      return;
    }

    await mongoose.connect(process.env.MONGODB_URL as string);
    console.log('Connected to DB');
  } catch (e) {
    console.error('Error connecting to DB:');
  }
}

import { authSignUpType } from "@/types";
import Task from "@/models/Task";
export function regexTest(type: 'signup', data: authSignUpType): any;
export function regexTest(type: 'login', data: { email: string; password: string; }): any;
export function regexTest(type: string, data: any): any {
    console.log(data);
    const error = {
        username: '',
        email: '',
        password: '',
    };

    const usernameRegex = /^[a-zA-Z0-9_]{3,}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^(?=.*\d)[\s\S]{6,}$/;

    if (type === 'signup') {
        if (data.username === "") {
            error.username = "this field is empty";
        } else if (!usernameRegex.test(data.username)) {
            error.username = "Username: 3+ characters, letters, numbers, underscores only.";
        }
    }

    if (data.email === "") {
        error.email = "this field is empty";
    } else if (!emailRegex.test(data.email)) {
        error.email = "email is not valid";
    }

    if (data.password === "") {
        error.password = "this field is empty";
    } else if (!passwordRegex.test(data.password)) {
        error.password = "Password must be at least 6 characters with a number";
    }

    return error;
}

var bcrypt = require('bcryptjs');
export async function hashPassword(password: string){
  const hashedPassword = bcrypt.hashSync(password , 13);
  return hashedPassword
}
export async function verifyPassword(password:string , hashedPassword:string) {
  const verify = bcrypt.compare(password , hashedPassword);
  return verify
}
var jwt = require('jsonwebtoken');
export async function tokenVerify(token:string , secretKey:string) {
  try{
    const result = await jwt.verify(token, secretKey);
    console.log(result);
    return {email: result.email}
  }catch{
    return false
  }
}

export function truncateText(text:string, maxLength:number) {
  if (text.length > maxLength) {
      return text.slice(0, maxLength) + '...';
  }
  return text;
}

import { toast } from 'react-toastify';

export function toastify( status:string , message:string){
  if(status === 'success'){
    toast.success(`${message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }else{
    toast.error(`${message}`, {
      position: "top-right",
      autoClose: 5000,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark",
      });
  }
}

