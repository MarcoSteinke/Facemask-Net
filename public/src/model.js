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
    outputs: ['label']
  }

const nn = ml5.neuralNetwork(options);

// method to perform after the dataset has been loaded
// make method asynchronous, so we can use it as a promise
async function performTraining() {
  console.log('data loaded');

  // label data
  let inputDataWithoutMask = [...document.querySelectorAll(".without_mask")]
    .map((image) => {
      return {}
    });

    // use p5 to transform the image into pixels
}

// wait for all images to load
let lastDatasetImage = [...document.querySelectorAll('.with_mask')].pop();
// execute "performTraining" after all images have been loaded
lastDatasetImage.addEventListener('load', performTraining)