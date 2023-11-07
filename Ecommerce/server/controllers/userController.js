const User = require('../models/userModel');
const asyncHandler = require('express-async-handler')

const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email: email});
    if (!findUser) {
        //create new user
        const newUser = await User.create(req.body);
        res.json(newUser);
    }
    else {
       throw new Error("User Alredy Exist")
    }
});

const loginUserControl = asyncHandler(async(req, res) => {
    const {email, password} = req.body;
    console.log(email , password)
});

module.exports={createUser, loginUserControl};
