const mongoose = require("mongoose");

const userSchema = mongoose.Schema({
    name: {type: String, required: true},
    email: { type:String, required: true, unique:true },
    password:{type: String, required: true},
    pic:{type:String,required: true, default: "https://images.unsplash.com/photo-1633332755192-727a05c4013d?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=580&q=80"}
},{
    timestamps: true
})

const User = mongoose.model("User", userSchema)

module.exports = User;