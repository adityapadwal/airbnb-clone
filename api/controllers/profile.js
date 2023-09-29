// Importing the user model
const User = require('../models/User.js');

// Importing the jwt model
const jwt = require('jsonwebtoken');

// Importing the jwt secret token 
const jwtSecret = process.env.JWT_SECRET;

// All controllers
exports.getProfile = (req, res) => {
    const {token} = req.cookies;
    if(token) {
        jwt.verify(token, jwtSecret, {}, async (err, userData) => {
            if(err) {
                throw err;
            } else {
                const {name, email, _id} = await User.findById(userData.id);
                res.json({name, email, _id});
            }
        });
    } else {
        res.json(null);
    }
};