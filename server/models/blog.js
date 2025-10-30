import mongoose from "mongoose";

const blogSchema = new mongoose.Schema({
    title : {type : String, required : true},
    description : {type : String, required : true},
    author : {type : mongoose.Schema.Types.ObjectId, ref : 'User',required : true},   //Connected two schema
    selectedFile :   String,    //For images
    tags  : {type : ['String']}
})

export default mongoose.model("Blog", blogSchema)                                //Does this line's execution results in 'blogs' collection creation in mongodb ?