import { Schema , model , models } from "mongoose";


const TaskSchema = new Schema({
    email:{
        type: 'string',
        required: true,
    },
    taskName:{
        type: 'string',
        required:true,
    },
    listName:{  
        type: 'string',
        required:true,
    },
    clock:{
        type: 'string',
    },
    calendar:{
        type: 'string',
    },
    createdAt:{
        type: Date,
        default: ()=> Date.now(),
    }
});

const Task = models.Task || model("Task" , TaskSchema);

export default Task;