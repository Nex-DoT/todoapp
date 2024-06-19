import { Schema , model , models } from "mongoose";

const Nots = new Schema({
    email:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    description:{
        type: String,
        required: true,
    },
    color:{
        type: String,
        required:true,
    },
})

const Note = models.Note || model("Note" , Nots);

export default Note;