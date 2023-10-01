// Importing the express module
const express = require("express");

// Importing multer module
const multer = require('multer');

// Importing the upload controller
const uploadController = require("../controllers/upload.js");

// Importing express router
const router = express.Router();

// All routes
router.post("/upload-by-link", uploadController.postUploadByLink);

const photosMiddleware = multer({dest: 'uploads/'});
router.post("/upload",photosMiddleware.array('photos', 100), uploadController.postUpload);

// exporting the routes
module.exports = router;