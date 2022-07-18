const express = require('express')
const app = express()
const port = 8080

app.use(express.static('public'));

const loadImages = require('./util.js')

const WITHOUT_MASK = "./public/without_mask/";
const WITH_MASK = "./public/with_mask/";

const simpleImagesWithoutMask = loadImages(WITHOUT_MASK + "simple")
const complexImagesWithoutMask = loadImages(WITHOUT_MASK + "complex")


app.get('/', (req, res) => res.send(simpleImagesWithoutMask.concat(complexImagesWithoutMask)))
app.listen(port, () => console.log(`Example app listening on port ${port}!`))