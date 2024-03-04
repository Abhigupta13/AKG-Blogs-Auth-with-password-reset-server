require('dotenv').config()
const nodemailer = require("nodemailer");
exports.transporter = nodemailer.createTransport({
    service:"gmail",
    // host: "smtp.gmail.com",
    // port: 587,
    // secure: false, // true for 465, false for other ports 587
    auth:{
        user: 'quickmart.akg@gmail.com', // gmail
    pass: process.env.MAIL_PASSWORD, // pass
    }
})
exports.welcomeTemplate = function(name){

    return (
        `<!DOCTYPE html>
        <html lang="en">
        <head>
            <meta charset="UTF-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Welcome to AKG-Blogs!</title>
        </head>
        <body style="font-family: Arial, sans-serif; background-color: #f9f9f9; color: #333; padding: 20px;">
        
            <h1 style="color: #007bff;">Welcome to AKG-Blogs!</h1>
        
            <p>Dear ${name},</p>
        
            <p>Welcome to AKG-Blogs! We're thrilled to have you as a part of our community.</p>
        
            <p>Here are a few things you can do now:</p>
            <ol>
                <li>Explore our latest blog posts.</li>
                <li>Connect with other members in our community.</li>
                <li>Share your thoughts and experiences by posting comments on blogs.</li>
            </ol>
        
            <p>If you have any questions or need assistance, feel free to reach out to us at <a href="mailto:support@akg-blogs.com">support@akg-blogs.com</a>.</p>
        
            <p>Happy reading and blogging!</p>
        
            <p>Best regards,<br>
            Abhishek K. Gupta <br>
            AKG-Blogs Team</p>
        
        </body>
        </html>
        
        `
    )}