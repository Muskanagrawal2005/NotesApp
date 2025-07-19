import mongoose from 'mongoose'
import User from './User.js';

const noteSchema=mongoose.Schema({
    heading: String,
    content: String,
    userId:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User,
        required:true
    },
    isPublic:{type:Boolean,default:false},
    },{timestamps: true});

    const Note=mongoose.model('Note',noteSchema);
    export default Note;