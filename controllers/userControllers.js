const generateToken = require("../gentoken/generateToken");
const User = require("../models/userModel");
const bcrypt = require("bcrypt");
const { transporter,welcomeTemplate } = require("../config/mail");
const registerUser = async(req,res)=>{
    const {name,email,password} = req.body;
    if (!name || !email || !password) {
        res.status(400).send("Please enter all the Fields");
       
    }
    const exiUser = await User.findOne({email});
    if(exiUser){
        res.status(400).send("user already exists");
       
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password,salt);
    const user = await User.create({
        name,
        email,
        password:hashedPassword
    });
    if(user){
        res.status(201).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            token: generateToken(user._id)
        })
        const mailOptions ={
            from :"quickmart.akg@gmail.com",
            to:email,
            subject:"Successfully Sign up to AKG-Blogs",
            html:welcomeTemplate(user.name) 
        }
        transporter.sendMail(mailOptions,(error,info)=>{
            if(error){
                console.log(error)
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
    } else {
        res.status(400).send("Failed to create a new user ");;
    }

};
const loginUser = async(req,res)=>{
    const {email,password} = req.body;
    // console.log("hello")
    try {
        if (!email || !password) {
            res.status(400).send("Enter all the Fields");
            return;
        }
        
        const user = await User.findOne({ email });
        if (!user) {
            res.status(404).send("User Not Found");
            return;
        }
        
        const result = await bcrypt.compare(password, user.password);
        if (!result) {
            res.status(404).send("Invalid Password");
            return;
        }
        if(user&& result){
            res.json({
                _id: user._id,
                name: user.name,
                email: user.email,
                token: generateToken(user._id)
            })
           

        }
    } catch (error) {
        res.status(401).json({
            status: 401,
            error
        })
    }
   
}

module.exports = {registerUser,loginUser}