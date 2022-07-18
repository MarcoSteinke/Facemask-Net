const express = require('express')
const app = express()
const port = 8080

// Dataset has to be added to the public directory
// We are using the "FMD_DATASET"
app.use(express.static('public'));

// set the view engine to ejs
app.set('view engine', 'ejs');

const loadImages = require('./util.js')

const WITHOUT_MASK = "./public/without_mask/";
const WITH_MASK = "./public/with_mask/";

const simpleImagesWithoutMask = loadImages(WITHOUT_MASK + "simple")
const complexImagesWithoutMask = loadImages(WITHOUT_MASK + "complex")


app.get('/', (req, res) => res.send(simpleImagesWithoutMask.concat(complexImagesWithoutMask)))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))