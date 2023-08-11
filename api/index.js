// Importing dotenv for the API Keys
require("dotenv").config(); 

// Importing all the modules
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");

// Secret key for password encryption
const bcryptSalt = bcrypt.genSaltSync(10);

// Importing all the models
const User = require("./models/User.js");

// creating an instance of the express application
const app = express(); 

// used to parse the incoming json data from the requests
app.use(express.json()); 

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
    const userDoc = await User.create({
        name, 
        email, 
        password: bcrypt.hashSync(password, bcryptSalt),
    });

    res.json(userDoc);
})

app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
