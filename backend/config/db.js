const mongoose = require("mongoose");

const connectionDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGODB_URL,{
            useNewUrlParser: true,
            useUnifiedTopology: true,
        })
        
        console.log(" mongoDB connected ", conn.connection.host);

    } catch (error) {
        
        console.log(" mongoDB connection error ", error.message);
        process.exit();

    }
}

module.exports = connectionDB