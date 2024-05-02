import mongoose from "mongoose";
export async function ConnectToDB(){
  try{
    if(!mongoose.connections[0]){
      await mongoose.connect(process.env.MONGODB_URL as string);
      console.log('Connected to DB');
      
    }
  }catch(e){
    console.log('Error connecting to DB');
  }
}