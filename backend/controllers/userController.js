import User from "../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken"
// import Token from "../models/Token.js";
// import {sendEmail} from "../sendEmail.js";
// import crypto from "crypto";

const generateToken=(userId)=>{
    const payload=userId;
    return jwt.sign(payload,process.env.JWT_SECRET)
}

// export const verifyUser=async(req,res)=>{
//     try{
//         const id = req.params.id;
//         const user=await User.findById(id);
//         if(!user){
//             return res.json({succes:false,message:'user not found'})
//         }
//         const t=await Token.findOne({userId:user._id,token:req.params.token})
//         if(!t){
//             return res.status(400).send({message:'invalid token'})
//         }
//         user.verified=true;
//         await user.save();
//         await t.deleteOne();
//         res.json({success:true,message:'Email verified successfully'})
//     }
//     catch(e){
//         console.log(e.message)
//         return res.json({succes:false,message:e.message})
//     }
// }   

export const registerUser = async(req,res)=>{
    try{
        const {name,email,password}=req.body;

        if(!name || !email || !password || password.length<3){
            return res.json({succes:false, message:'fill all the fields'})
        }

        const userExists= await User.findOne({email})
        if(userExists){
            return res.json({succes:false, message:'user already exists'})
        }
        const hashedPassword= await bcrypt.hash(password,10);
        const user=await User.create({name,email,password:hashedPassword})

        // const t= await new Token({userId:user._id,token:crypto.randomBytes(32).toString('hex')}).save();
        // const url=`${process.env.FRONTEND_BASE_URL}/user/${user._id}/verify/${t.token}`
        // await sendEmail(user.email,'Verify Email',url)

        //user.verified for email verification
        if (user) {
            const token = generateToken(user._id.toString());
            return res.status(201).json({ success: true, token, message: 'Registration successful and user is verified.' });
        } else {
            return res.status(201).json({ success: false, message: 'Could not register' });
        }

    }
    catch(e){
        console.log(e.message)
        res.json({succes: false, message:e.message})
    }
}


//LOGIN
export const loginUser=async(req,res)=>{
    try{
        const {email,password}=req.body
        const user=await User.findOne({email})
        if(!user){
            return res.json({succes:false,message:'user not found'})
        }
        const isMatch= await bcrypt.compare(password,user.password)
        if(!isMatch){
            return res.json({succes:false,message:'invalid credentials'})
        }

        // if(!user.verified){
        //     let t=await Token.findOne({userId:user._id})
        //     if(!t){
        //         t=await new Token({userId:user._id,token:crypto.randomBytes(32).toString('hex')}).save();
        //         const url=`${process.env.FRONTEND_BASE_URL}/user/${user._id}/verify/${t.token}`
        //         await sendEmail(user.email,'Verify Email',url)
        //     }
        //     return res.json({success:false,message:'please verify your email'})
        // }

        const token=generateToken(user._id.toString())
        res.json({success:true, token})
    }
    catch(e){
        console.log(e.message)
        return res.json({success:false,message:e.message})
    }
}

export const getUserData= async(req,res)=>{
    try{
        const {user} =req;
        res.json({success:true, user})
    }
    catch(e){
        console.log(e.message)
        return res.json({success:false,message:e.message})
    }
}
