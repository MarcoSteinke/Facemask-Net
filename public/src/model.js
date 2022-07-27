let nn, inputDataWithoutMask, inputDataWithMask, images = [];

const IMAGE_WIDTH = 128;
const IMAGE_HEIGHT = 128;
const IMAGE_CHANNELS = 4;

const options = {
  layers: [
      {
        type: 'conv2d',
        filters: 8,
        kernelSize: 5,
        strides: 1,
        activation: 'relu',
        kernelInitializer: 'varianceScaling',
      },
      {
        type: 'maxPooling2d',
        poolSize: [2, 2],
        strides: [2, 2],
      },
      {
        type: 'conv2d',
        filters: 16,
        kernelSize: 5,
        strides: 1,
        activation: 'relu',
        kernelInitializer: 'varianceScaling',
      },
      {
        type: 'maxPooling2d',
        poolSize: [2, 2],
        strides: [2, 2],
      },
      {
        type: 'flatten',
      },
      {
        type: 'dense',
        kernelInitializer: 'varianceScaling',
        activation: 'softmax',
      },
      {
          type: 'dense',
          activation: 'sigmoid',
          units: 64
      }
    ],
  task: "imageClassification",
  inputs:[IMAGE_WIDTH, IMAGE_HEIGHT, IMAGE_CHANNELS],
  debug: true
}

const trainingOptions = {
  epochs: 1024,
  batchSize: 48
}


nn = ml5.neuralNetwork(options);

// wait for all images to load
//let lastDatasetImage = [...document.querySelectorAll('.with_mask')].pop();
// execute "performTraining" after all images have been loaded
//lastDatasetImage.addEventListener('load', performTraining)

const getImage = async (path, label) => {
  const response = await fetch(path)
  const blob = await response.blob()
  const resourceUrl = URL.createObjectURL(blob)

  let image = window.loadImage(resourceUrl)
  //images.push({image: image, label: label})

  return {image: image, label: label}
}

function processImages(rawImages) {
  const result = [];
  // label data
  rawImages.without_mask.slice(0,100)
    .forEach((image) => 
      result.push(getImage(`/without_mask/${
        (image.includes("simple")) ? "simple/" + image : "complex/" + image}`, "without_mask")));

  rawImages.with_mask.slice(0,100)
    .forEach((image) => 
      result.push(getImage(`/with_mask/${
        (image.includes("simple")) ? "simple/" + image : "complex/" + image}`, "with_mask")));

  dataLoaded(result, rawImages);
}

function preload() {

  fetch("http://localhost:8080/images")
    .then(result => {return result.json()})
    .then(json => processImages(json))
}

function dataLoaded(loadedImages, rawImages) {

  const withoutMaskFileNames = rawImages.without_mask;
  const withMaskFileNames = rawImages.with_mask;
  const allFiles = withoutMaskFileNames.concat(withMaskFileNames);

  setTimeout(document.body.insertAdjacentHTML("afterbegin", loadedImages), 100)
  console.log("loadedImages: " + loadedImages);
  Promise.all(loadedImages).then(results => {
    results.forEach((result,i) => {
      console.log(`image ${i} loaded`)
      nn.addData({image: result}, {label: (i < 100) ? "without_mask" : "with_mask"})
    })
    document.body.insertAdjacentHTML("afterbegin", results[0].image.loadPixels() + ", " + results[0].label + "<br>".repeat(2))
    //nn.normalizeData();
    //nn.train(trainingOptions);
  })
  
}

function setup() {

}
