const {Resend} = require("resend");
const User = require("../models/users.model.js");
const bcryptjs = require("bcryptjs");
require("dotenv").config();
const RESEND_API_KEY = process.env.RESEND_API_KEY;

const createUser = async(req, res) => {
    try {
        const { name, userName, email, password, avatar, location } = req.body;
        const salt = await bcryptjs.genSalt(10);
        const hashedPassword = await bcryptjs.hash(password, salt);
        const existingUser = await User.findOne({ $or: [{ email }, { userName }] });
        if (existingUser) {
            let duplicatedField;
            if (existingUser.userName === userName) {
                duplicatedField = 'Username';
            } else if (existingUser.email === email) {
                duplicatedField = 'Email';
            }
            return res.status(400).json({ error: 'DuplicateEntry', message: `${duplicatedField} already exists` });
        }
        const user = await User({
            name:name, 
            userName:userName, 
            email:email, 
            password:hashedPassword,
            avatar:avatar,
            location:location
        });
        await user.save();
        res.status(201).json({
            message: "New User Created"
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const loginUser = async(req, res) => {
    try {
        
    } catch (error) {
        
    }
}

const uploadPhoto = async(req, res) => {
    try {
        const {location, avatar, email} = req.body;
        if(location===""){
            return res.status(400).json({
                message: "Location is required"
            });
        }else if(avatar===""){
            return res.status(400).json({
                message: "Avatar is required"
            });
        }
        const response = await User.findOneAndUpdate({email: email}, {location: location, avatar: avatar}, {runValidators: false});
        res.status(201).json({
            message: "Photo Uploaded",
            data: response
        });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            message: "Internal Server Error"
        })
    }
}

const sendEmailToUser = async (req, res) => {
    try {
        // const { email } = req.body;
        const resend = new Resend(RESEND_API_KEY);
        const response = await resend.emails.send({
            from: 'onboarding@resend.dev',
            to: "opencontainer255@gmail.com",
            subject: 'Thankyou',
            html: 'Thanks for giving me this opportunity. I think I will fit for fullstack role of your company'
        });
        if (response.error) {
            return res.status(400).json({ error: response.error });
        }
        return res.status(200).json({ message: "Email sent" });
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Internal Server Error" });
    }
};

module.exports = {
    createUser,
    loginUser,
    uploadPhoto,
    sendEmailToUser
}