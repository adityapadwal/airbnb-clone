// Importing the Place model
const Booking = require('../models/Booking.js');

// Importing the jwt model
const jwt = require('jsonwebtoken');

// Importing the jwt secret token 
const jwtSecret = process.env.JWT_SECRET;

// Getting user data from the token
function getUserDataFromToken(req) {
    return new Promise((resolve, reject) => {
        jwt.verify(req.cookies.token, jwtSecret, {}, async (err, userData) =>{
            if(err) {
                throw err;
            } else {
                resolve(userData);
            }
        });
    });   
};

// All controllers
exports.getBookings = async(req, res) => {
    const userData = await getUserDataFromToken(req);
    res.json( await Booking.find({user: userData.id}).populate('place') );
};

exports.postBookings = async(req, res) => {
    const userData = await getUserDataFromToken(req);
    const{place, checkIn, checkOut, numberOfGuests, name, phone, price} = req.body;
    Booking.create({place, user: userData.id, checkIn, checkOut, numberOfGuests, name, phone, price})
    .then((doc) => {
        res.json(doc);
    })
    .catch((err) => {
        throw err;
    });
};