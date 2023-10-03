// Importing dotenv for the API Keys
require("dotenv").config(); 

// Importing the image-downloader module
const imageDownloader = require('image-downloader');

// Importing the path module
const path = require('path');

// Importing the in-built file system module to rename/handle files on the server
const fs = require('fs');

// To get the mimetype from the file that is located in our server
const mime = require('mime-types');

// Importing AWS S3 client
const {S3Client, PutObjectCommand} = require('@aws-sdk/client-s3');
// AWS S3 Bucket
const bucket = 'aditya-airbnb-clone-app';

// Uploading images to AWS S3
async function uploadToS3(path, originalFilename, mimetype) {
    const client = new S3Client({
        region: 'ap-south-1',
        credentials: {
            accessKeyId: process.env.S3_ACCESS_KEY,
            secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
        },
    });
    const parts = originalFilename.split('.');
    const ext = parts[parts.length - 1];
    const newFilename = Date.now() + '.' + ext;

    const data = await client.send(new PutObjectCommand({
        Bucket: bucket,
        Body: fs.readFileSync(path),
        Key: newFilename,
        ContentType: mimetype,
        ACL: 'public-read'
    }));
    return `https://${bucket}.s3.amazonaws.com/${newFilename}`;
};

// All controllers
exports.postUploadByLink = async(req, res) => {
    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';

    await imageDownloader.image({
        url: link,
        dest: '/tmp/' + newName,
    });
    const url = await uploadToS3('/tmp/'+newName, newName, mime.lookup('/tmp/'+newName))
    res.json(url);
};

// path contains the path, originalname contains the extension of the photo
exports.postUpload = async(req, res) => {
    const uploadedFiles = [];
    for(let i=0; i<req.files.length; i++) {
        const {path, originalname, mimetype} = req.files[i];
        const url = await uploadToS3(path, originalname, mimetype);
        uploadedFiles.push(url);
    }
    res.json(uploadedFiles);
};