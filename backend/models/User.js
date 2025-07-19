import mongoose from "mongoose";

const userSchema=new mongoose.Schema({
    name: {type: String, required:true},
    email: {type: String, required:true, unique:true},
    password:{type:String, required:false}, // Made optional for social login
    role:{type:String, enum:["owner","user"],default:'user'},
    image:{type:String, default:''},
    // verified:{type:Boolean, default:false},
    
},{timestamps:true})

const User=mongoose.model('User',userSchema)

export default User;