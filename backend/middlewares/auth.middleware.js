const jwt = require("jsonwebtoken");
const asyncHandler = require("express-async-handler");
const User = require("../models/user.model");

const authUserMiddleware = asyncHandler(async (req, res, next) => {
    let token;

    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
        try {
            token = req.headers.authorization.split(" ")[1];

            const payload = jwt.verify(token, process.env.JWT_SECRET_KEY);
            const { _id } = payload;

            req.user = await User.findById(_id);

            next();
        } catch (error) {
            res.status(401).json({ error: "You must be logged in." });
        }
    } else {
        res.status(401).json({ error: "You must be logged in." });
    }
});


module.exports = {authUserMiddleware};