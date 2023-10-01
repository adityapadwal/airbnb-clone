// Importing the Place model
const Place = require('../models/Place.js');

// Importing the jwt model
const jwt = require('jsonwebtoken');

// Importing the jwt secret token 
const jwtSecret = process.env.JWT_SECRET;

// All controllers
exports.postPlaces = (req, res) => {
    const {token} = req.cookies;
    const {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price} = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if(err) {
            throw err;
        } else {
            const placeDoc = await Place.create({
                owner: userData.id,
                title: title,
                address: address, 
                photos: addedPhotos,
                description: description, 
                perks: perks, 
                extraInfo: extraInfo, 
                checkIn: checkIn, 
                checkOut: checkOut,
                maxGuests: maxGuests,
                price: price
            });

            res.json(placeDoc);
        }
    });
};

exports.putPlaces = (req, res) => {
    const {token} = req.cookies;
    const {id, title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests, price} = req.body;
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        const placeDoc = await Place.findById(id);
        if(err) {
            throw err;
        } else {
            if(userData.id === placeDoc.owner.toString()) {
                placeDoc.set({
                    title: title,
                    address: address, 
                    photos: addedPhotos,
                    description: description, 
                    perks: perks, 
                    extraInfo: extraInfo, 
                    checkIn: checkIn, 
                    checkOut: checkOut,
                    maxGuests: maxGuests,
                    price: price
                })
                await placeDoc.save();
                res.json('Place Updated');
            }
        }
    });
};

exports.getUserPlaces = (req, res) => {
    const {token} = req.cookies;
    //grabbing the user
    jwt.verify(token, jwtSecret, {}, async (err, userData) => {
        if(err) {
            throw err;
        } else {
            const {id} = userData;
            const placesData = await(Place.find({owner: id}));
            res.json(placesData);
        }
    });
};

exports.getPlacesById = async(req, res) => {
    const {id} = req.params;
    const place = await Place.findById(id);
    res.json(place);
};

exports.getPlaces = async(req, res) => {
    const allPlaces = await Place.find();
    res.json(allPlaces);
};