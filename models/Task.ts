import { Schema, model, models } from "mongoose";

const TaskSchema = new Schema({
  email: {
    type: String,  
    required: true,
  },
  isDone:{
    type: Boolean, 
    required: true,
  },
  isImportant: {
    type: Boolean,
    required: true,
  },
  task: {
    type: String,  
    required: true,
  },
  list: {
    type: String,  
    required: true,
  },
  time: {
    type: String,  
  },
  date: {
    type: String,  
  },
  description: {
    type: String,  
    required: false,
  }
}, { timestamps: true }); 

const Task = models.Task || model("Task", TaskSchema);

export default Task;