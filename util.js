//requiring path and fs modules
const path = require('path');
const fs = require('fs');
//joining path of directory 
const directoryPath = path.join(__dirname, 'Documents');
//passsing directoryPath and callback function
const files = [];



function loadImages(directoryPath) {
    const loadedImages = [];
    fs.readdir(directoryPath, function (err, files) {
        //handling error
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        //listing all files using forEach
        files.forEach(function (file) {
            // Do whatever you want to do with the file
            loadedImages.push(file);
        });
    });

    return loadedImages;
}

function splitDataset(threshold, dataset) {
    return threshold >= 0 ? [dataset.slice(0, threshold), dataset.slice(threshold)] : [[], []];
}

module.exports = {loadImages, splitDataset};