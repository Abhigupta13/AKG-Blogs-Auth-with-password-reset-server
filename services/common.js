const User = require("../models/userModel");
require('dotenv').config();
const bcrypt = require("bcrypt")
const jwt = require("jsonwebtoken");
const { transporter } = require("../config/mail");

exports.checkAuth=async(req,res)=>{
    const {id,token} = req.params;
    try {
        const validUser = await User.findOne({_id:id,verifyToken : token});
        const verifyToken = jwt.verify(token,process.env.SECRET)
        if(verifyToken._id&&validUser){
            res.status(201).json({
                status:201,
                validUser
            })
        }else{
            res.status(401).json({
                status: 401,
                message:"User Doesnot exist" 
            })
        }
    } catch (error) {
        res.status(401).json({
            status: 401,
            error
        })
    }
}
exports.forgetPasswordRequest=async(req,res)=>{

    const {email} = req.body;    
    // console.log(email);
    if(!email){
        res.status(401).json({status:401 ,message:"Enter your email"})
    }
    try {
        const user = await User.findOne({email});
        if(!user){
            res.status(404).send("User Not Found");
        }
        const token = jwt.sign({_id:user._id},process.env.SECRET,{
            expiresIn:"1d"
        })
        const setUserToken = await User.findByIdAndUpdate({ _id: user._id }, { verifyToken :token},{new:true})
        console.log(setUserToken);
        if(setUserToken){
            const mailOptions ={
                from :"quickmart.akg@gmail.com",
                to:email,
                subject:"Password Reset Link",
                text:`This Link is valid for 2 min http://localhost:3000/reset-password/${user._id}/${setUserToken.verifyToken}`
            }
            transporter.sendMail(mailOptions,(error,info)=>{
                console.log(error)
                if(error){
                    res.status(401).json({
                        status:401,
                        message:"Email not send"
                    })
                }else{
                    console.log("mail sent",info.response)
                    res.status(201).json({
                        status:201,
                        message:"Email send successfully"
                    })
                }
            })
        }
    } catch (error) {
        res.status(401).json({
            status: 401,
            message: "Email not send"
        })
    }
}
exports.resetPassword =async (req, res) => {
    const { id, token } = req.params;
    const {password} = req.body;
    try {
        const validUser = await User.findOne({ _id: id, verifyToken: token });
        const verifyToken = await jwt.verify(token, process.env.SECRET)
        if (verifyToken._id && validUser) {
            const salt = await bcrypt.genSalt(10);
            const newpassword = await bcrypt.hash(password,salt)
            const setNewUser = await User.findByIdAndUpdate({_id:id},{password:newpassword});
            await setNewUser.save();
            res.status(201).json({
                status: 201,
                setNewUser,
                message: "Password changed successfully"
            })
        } else {
            res.status(401).json({
                status: 401,
                message: "User Doesnot exist"
            })
        }
    } catch (error) {
        res.status(401).json({
            status: 401,
            error
        })
    }
}

  