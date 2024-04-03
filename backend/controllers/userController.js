const User = require("../models/users.model.js");
const bcryptjs = require("bcryptjs");
require("dotenv").config();

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
    
}

module.exports = {
    createUser,
    loginUser
}