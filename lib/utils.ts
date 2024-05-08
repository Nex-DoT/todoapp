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
export function regexTest(type: string, data: authSignUpType) {
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
export async function unHashPassword(password:string , hashedPassword:string) {
  const verify = bcrypt.compare(password , hashedPassword);
  return verify
}