const {default: mongoose} = require('mongoose');

const dbConnect = () => {
    try {
        const conn = mongoose.connect(process.env.MONGODB);
        console.log("Successfully connected to databse")
    }
    catch (error) {
        console.log("database error")
    }
};

module.exports = dbConnect;