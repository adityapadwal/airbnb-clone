// Importing the image-downloader module
const imageDownloader = require('image-downloader');

// Importing the path module
const path = require('path');

// Importing the in-built file system module to rename/handle files on the server
const fs = require('fs');

// All controllers
exports.postUploadByLink = async(req, res) => {
    const mainFileDirectory = path.dirname(require.main.filename);
    console.log(mainFileDirectory);

    const { link } = req.body;
    const newName = 'photo' + Date.now() + '.jpg';

    // Construct the full path for uploading
    const uploadPath = path.join(mainFileDirectory, '/uploads/', newName);

    await imageDownloader.image({
        url: link,
        dest: uploadPath,
    });
    res.json(newName);
};

// path contains the path, originalname contains the extension of the photo
exports.postUpload = (req, res) => {
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
};