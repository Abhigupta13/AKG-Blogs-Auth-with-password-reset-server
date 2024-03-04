const mongoose = require("mongoose")

const userSchema = mongoose.Schema({
    name:{
        type:String,
        required: true
    },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
    verifyToken :{
        type:String
    }
},{
    timestamps: true
});

const User = mongoose.model("User", userSchema);
module.exports = User