// Importing the express module
const express = require("express");

// Importing the place controller
const placeController = require("../controllers/place.js");

// Importing express router
const router = express.Router();

// All routes 
router.post("/places", placeController.postPlaces);
router.put("/places", placeController.putPlaces);
router.get("/user-places", placeController.getUserPlaces);
router.get("/places/:id", placeController.getPlacesById);
router.get('/places', placeController.getPlaces);

// exporting the routes
module.exports = router;