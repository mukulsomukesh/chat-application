const asyncHandler = require("express-async-handler")
const User = require("../models/user.model")
const jwt = require("jsonwebtoken")

//  create jwt token
function generateJwtToken(_id){
    return jwt.sign({_id}, process.env.JWT_SECRET_KEY,{
        expiresIn:"3d",
    });
}

//  create new user
const registerUser = asyncHandler(async (req, res) =>{

    const {name, email, password, pic} = req.body;

    //  check if all fields are filled
    if(!name || !email || !password){
        res.status(400);
        throw new Error("Please Fill All The Fields.");
    }

    // check if user already created
    const userExist = await User.findOne({email});
    if(userExist){
        res.status(400);
        throw new Error("User Already Exist.");
    }

    //  add user info to db
    const user = await User.create({name, email, password, pic});
    if(user){
        res.status(200).json({
            _id:user._id,
            name:user.name,
            email:user.email,
            pic:user.pic,
            token:generateJwtToken(user._id),
        })
    }
    else{
        res.status(400);
        throw new Error("Failed to create user.")
    }
})



module.exports = {registerUser};