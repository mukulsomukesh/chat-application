const asyncHandler = require("express-async-handler")
const User = require("../models/user.model")
const jwt = require("jsonwebtoken")
const bcrypt = require("bcrypt")

//  create jwt token
function generateJwtToken(_id) {
    return jwt.sign({ _id }, process.env.JWT_SECRET_KEY, {
        expiresIn: "3d",
    });
}

//  create new user
const registerUser = asyncHandler(async (req, res) => {

    const { name, email, password, pic } = req.body;

    //  check if all fields are filled
    if (!name || !email || !password) {
        res.status(422).json({error:"Please Fill All The Fields."})
    }

    // check if user already created
    const userExist = await User.findOne({ email });
    if (userExist) {
        return res.status(422).json({error:"User Already Exist."})
    }

    //  hashed password
    const hashedPassword = await bcrypt.hash(password, 10);

    //  add user info to db
    const user = await User.create({ name, email, password:hashedPassword, pic });
    if (user) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateJwtToken(user._id),
        })
    }
    else {
            return res.status(422).json({error:"Login Failed."})
    }
})


//  signin user
const authUser = asyncHandler(async (req, res) => {

    const { email, password } = req.body;

    //  check if all fields are filled
    if (!email || !password) {
        res.status(422).json({error:"Please Fill All The Fields."})
    }

    // find user 
    const user = await User.findOne({ email:email });

    if (user && (await bcrypt.compare(password, user.password)) ) {
        res.status(200).json({
            _id: user._id,
            name: user.name,
            email: user.email,
            pic: user.pic,
            token: generateJwtToken(user._id),
        })
    }
    else{
        res.status(400);
        throw new Error("Incorrect email or password.");
    }
})


module.exports = { registerUser, authUser };