let nn, inputDataWithoutMask, inputDataWithMask, images = [];

const IMAGE_WIDTH = 128;
  const IMAGE_HEIGHT = 128;
  const IMAGE_CHANNELS = 4;

  const options = {
    epochs: 1024,
    batchSize: 48,
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
    outputs: ['label'],
    debug: true
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

  images.push({image: window.loadImage(resourceUrl), label: label})  // this is p5.js loadImage
}

async function performTraining(data) {
  console.log('data loaded');

  // label data
  data.without_mask
    .forEach((image) => 
      getImage(`/without_mask/${
        (image.includes("simple")) ? "simple/" + image : "complex/" + image}`));

  data.with_mask
    .forEach((image) => 
      getImage(`/with_mask/${
        (image.includes("simple")) ? "simple/" + image : "complex/" + image}`));

  images.forEach(
    (data) => {
      nn.addData({image: data.image}, {label: data.label});
    }
  )

  //nn.normalizeData();

  //nn.train(options, console.log("finished training"));
}

function setup() {
  fetch("http://localhost:8080/images").then(result => {return result.json()}).then(json => performTraining(json));
}