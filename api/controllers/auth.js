// Importing the user model
const User = require('../models/User.js');

// Importing the bcrypt module
// Secret key for password encryption
const bcrypt = require("bcryptjs");
const bcryptSalt = bcrypt.genSaltSync(10);

// Importing the jwt model
const jwt = require('jsonwebtoken');

// Importing the jwt secret token 
const jwtSecret = process.env.JWT_SECRET;

// All controllers
exports.postRegister = async(req, res) => {
    const {name, email, password} = req.body;
    try {
        const userDoc = await User.create({
            name, 
            email, 
            password: bcrypt.hashSync(password, bcryptSalt),
        });
        res.json(userDoc);
    }
    catch (event){
        res.status(422).json(event);
    }
};

exports.postLogin = async(req, res) => {
    const {email, password} = req.body;

    const userDoc = await User.findOne({email});
    if(userDoc) {
        const passOk = bcrypt.compareSync(password, userDoc.password);
        if(passOk) {
            // creating a json web token
            jwt.sign({
                email: userDoc.email, 
                id: userDoc._id,
            }, jwtSecret, {}, (err, token) => {
                if(err) {
                    throw err;
                } else {
                    res.cookie('token', token).json(userDoc);
                }
            });
        } else {
            res.status(422).json('Password not ok');
        }
    } else {
        res.status(422).json('User not found');
    }
};

exports.postLogout = (req, res) => {
    // resetting the cookie
    res.cookie('token', '').json(true);
};