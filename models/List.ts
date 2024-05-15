import { Schema , model , models } from "mongoose";

const ListSchema = new Schema({
    email:{
        type: "string",
        required: true,
    },
    name:{
        type: "string",
        required: true,
    },
    color:{
        type: "string",
        required:true,
    }
});

const List = models.List || model("List" , ListSchema);

export default List;