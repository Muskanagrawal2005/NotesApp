import Note from "../models/Note.js";

export const createNote=async(req,res)=>{
    try{
        const {heading,content}=req.body;
        console.log("req.user:", req.user);
        console.log("Request body:", req.body);
        const note=await Note.create({heading,content,userId:req.user.id})
        if(note){
           res.status(201).json({success:true, message: 'note added'})
        }else{
            res.status(500).json({success:false, message: 'note could not add'})
        }
    }
    catch(e){
        console.error(e);
        res.status(500).json({ error: 'Server error' });
    }
}