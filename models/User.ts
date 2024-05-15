import { Schema , model , models } from "mongoose";

const userSchema = new Schema({
    username:{
        required: true,
        type: "string",
    },
    email:{
        required: true,
        type: "string",
    },
    password:{
        required: true,
        type: "string",
    },
    createdAt:{
        type: Date,
        default: Date.now,
        immutable: true,
    },
});

const User = models.User || model('User' , userSchema);

export default User;


