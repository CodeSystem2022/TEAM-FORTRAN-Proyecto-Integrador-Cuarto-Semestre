const User = require('../models/userModel');
const asyncHandler = require('express-async-handler')
const bcrypt = require('bcrypt');
const { generateToken } = require('../config/jwtToken');
const jwt = require('jsonwebtoken');


const createUser = asyncHandler(async (req, res) => {
    const email = req.body.email;
    const findUser = await User.findOne({email: email});
    if (!findUser) {
        //create new user
        const newUser = await User.create(req.body);
        res.json(newUser);
        console.log("usuario con exito");
    }
    else {
       throw new Error("User Alredy Exist")
    }
});


const loginUserControl = asyncHandler(async (req, res) => {
    const { email, password } = req.body;

    // Check if user exists or not
    const findUser = await User.findOne({ email });
    if (findUser && (await findUser.isPasswordMatches(password))) {
        res.json({
            _id: findUser?._id,
            email: findUser?.email,
            password: findUser?.password,
            token: generateToken(findUser?._id),
        });
        console.log("Usuario logeado");
        
    } else {
        // Credenciales no válidas
        res.status(401).json({ message: "Invalid Credentials" });
        console.log("Credenciales no válidas");
    }
});

module.exports = { createUser, loginUserControl };
