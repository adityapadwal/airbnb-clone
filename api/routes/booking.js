// Importing the express module
const express = require("express");

// Importing the place controller
const bookingController = require("../controllers/booking.js");

// Importing express router
const router = express.Router();

// All routes
router.get("/bookings", bookingController.getBookings);
router.post("/bookings", bookingController.postBookings);

// exporting the routes
module.exports = router;