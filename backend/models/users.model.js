const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    userName: {
        type: String,
        required: true,
        unique: [true, "Username already exists"],
    },
    email: {
        type: String,
        required: true,
        unique: [true, "Email already exists"],
    },
    password: {
        type: String,
        required: true,
    },
    avatar: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true,
    }
    
}, {timespans: true});

module.exports = mongoose.model.Users || mongoose.model("Users", userSchema);