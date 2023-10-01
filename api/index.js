// Importing dotenv for the API Keys
require("dotenv").config(); 

// Importing all the modules
const express = require('express');
const cors = require('cors');
const mongoose = require("mongoose");
const cookieParser = require('cookie-parser');

// Importing all the routes 
const authRoutes = require("./routes/auth.js");
const profileRoutes = require("./routes/profile.js");
const uploadRoutes = require("./routes/upload.js");
const placeRoutes = require("./routes/place.js");
const bookingRoutes = require("./routes/booking.js");

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

// Implementing the above imported routes
app.use(authRoutes);
app.use(profileRoutes);
app.use(uploadRoutes);
app.use(placeRoutes);
app.use(bookingRoutes);

// Running the express app
app.listen(4000, () => {
    console.log("Server is running on port 4000");
});
