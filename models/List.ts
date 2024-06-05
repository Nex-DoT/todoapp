import { Schema , model , models } from "mongoose";

const ListSchema = new Schema({
    email:{
        type: String,
        required: true,
    },
    name:{
        type: String,
        required: true,
    },
    color:{
        type: String,
        required:true,
    }
});

const List = models.List || model("List" , ListSchema);

export default List;