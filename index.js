const express = require('express')
const app = express()
const port = 8080

// Dataset has to be added to the public directory
// We are using the "FMD_DATASET"
app.use(express.static('public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

const {loadImages, splitDataset} = require('./util.js')

const WITHOUT_MASK = "./public/without_mask/";
const WITH_MASK = "./public/with_mask/";

const simpleImagesWithoutMask = loadImages(WITHOUT_MASK + "simple")
const complexImagesWithoutMask = loadImages(WITHOUT_MASK + "complex")
const simpleImagesWithMask = loadImages(WITH_MASK + "simple")
const complexImagesWithMask = loadImages(WITH_MASK + "complex")

const numberOfRenderedImages = 8;
app.get('/', (req, res) => res.render("index.ejs", {numberOfRenderedImages: numberOfRenderedImages, without_mask: simpleImagesWithoutMask.concat(complexImagesWithoutMask), with_mask: simpleImagesWithMask.concat(complexImagesWithMask)}))
app.get('/images', (req, res) => res.json({numberOfRenderedImages: numberOfRenderedImages, without_mask: simpleImagesWithoutMask.concat(complexImagesWithoutMask), with_mask: simpleImagesWithMask.concat(complexImagesWithMask)}))
app.listen(port, () => console.log(`Visit http://localhost:${port}!`))