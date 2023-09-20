// Importing dotenv for the API Keys
require("dotenv").config(); 

// Importing all the modules
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const cookieParser = require('cookie-parser');
const imageDownloader = require('image-downloader');
const multer = require('multer');
const fs = require('fs'); // to rename/handle files on the server

// Secret key for password encryption
const bcryptSalt = bcrypt.genSaltSync(10);
const jwtSecret = '1qwertyuiop2asdfghjkl3zxcvbnm';

// Importing all the models
const User = require("./models/User.js");
const Place = require("./models/Place.js");

// creating an instance of the express application
const app = express(); 

// Middlewares
// used to parse the incoming json data from the requests
app.use(express.json()); 

app.use(cookieParser());

//  configuring an Express.js middleware to serve static files
app.use('/uploads', express.static(__dirname+'/uploads'));

app.use(cors({
    credentials: true,
    origin: 'http://127.0.0.1:5173',
}));

// mongoDB connection
mongoose
  .connect(process.env.MONGO_URL)

app.get('/test', (req, res) => {
    res.json('Test ok!');
});

app.post('/register', async (req, res) => {
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
});

app.post('/login', async(req, res) => {
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
});

app.post('/logout', (req, res) => {
    // resetting the cookie
    res.cookie('token', '').json(true);
});

app.get('/profile', (req, res) => {
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
});

app.post('/upload-by-link', async (req, res) => {
    const {link} = req.body;
    const newName = 'photo' + Date.now() + '.jpg';
    await imageDownloader.image({
        url: link,
        dest: __dirname + '/uploads/' + newName,
    });
    res.json(newName);
});


// path contains the path, originalname contains the extension of the photo
const photosMiddleware = multer({dest: 'uploads/'});
app.post('/upload', photosMiddleware.array('photos', 100),(req, res) => {
    const uploadedFiles = [];
    for(let i=0; i<req.files.length; i++) {
        console.log(req.files)
        const {path, originalname} = req.files[i];
        const parts = originalname.split('.');
        const extension = parts[parts.length - 1];
        const newPath = path + '.' + extension;
        fs.renameSync(path, newPath);
        uploadedFiles.push(newPath.replace('uploads\\', ''));
    }
    res.json(uploadedFiles);
});

app.post('/places', (req, res) => {
    const {token} = req.cookies;
    const {title, address, addedPhotos, description, perks, extraInfo, checkIn, checkOut, maxGuests} = req.body;
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
                maxGuests: maxGuests
            });

            res.json(placeDoc);
        }
    });
});

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
