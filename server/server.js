const tf = require('@tensorflow/tfjs-node')
const handpose = require('@tensorflow-models/handpose')
const { spawn } = require('child_process');
var http = require('http')

// -- List devices
// ffmpeg -f avfoundation -list_devices true -i ""

// -- Screen capture command
// ffmpeg -f avfoundation -r 30 -s 1280x720 -i "3:0"  output.mkv

//
require('@tensorflow/tfjs-backend-webgl')
// require('@tensorflow/tfjs-backend-wasm')
//

const width = 1280
const height = 720

// async function main() {
//   console.log(handpose)

//   // Load the MediaPipe handpose model.
//   const model = await handpose.load()
//   // Pass in a video stream (or an image, canvas, or 3D tensor) to obtain a
//   // hand prediction from the MediaPipe graph.

//   console.log('capping')

//   // var smile = new Canvas.Image();
//   // smile.src = data;
//   // console.log(smile);

//   const data = ""

//   const predictions = await model.estimateHands({ data, width, height })

//   console.log(predictions)

//   if (predictions.length > 0) {
//     /*
//     `predictions` is an array of objects describing each detected hand, for example:
//     [
//       {
//         handInViewConfidence: 1, // The probability of a hand being present.
//         boundingBox: { // The bounding box surrounding the hand.
//           topLeft: [162.91, -17.42],
//           bottomRight: [548.56, 368.23],
//         },
//         landmarks: [ // The 3D coordinates of each hand landmark.
//           [472.52, 298.59, 0.00],
//           [412.80, 315.64, -6.18],
//           ...
//         ],
//         annotations: { // Semantic groupings of the `landmarks` coordinates.
//           thumb: [
//             [412.80, 315.64, -6.18]
//             [350.02, 298.38, -7.14],
//             ...
//           ],
//           ...
//         }
//       }
//     ]
//     */

//     for (let i = 0; i < predictions.length; i++) {
//       const keypoints = predictions[i].landmarks

//       // Log hand keypoints.
//       for (let i = 0; i < keypoints.length; i++) {
//         const [x, y, z] = keypoints[i]
//         console.log(`Keypoint ${i}: [${x}, ${y}, ${z}]`)
//       }
//     }
//   }
// }

// tf.setBackend('wasm').then(() => main())
// main();


// Create an HTTP server
const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('okay');
});

// / Now that server is running
server.listen(1337, '127.0.0.1', () => {
  console.log("TO");

  const process = spawn(
    "ffmpeg",
    [
      '-probesize',
      '10M',
      '-f',
      'gdigrab',
      '-framerate',
      '60',
      '-i',
      'desktop',
      '-f',
      'flv',
      "-"
    ],
  )

  const stream = process.stdout

  stream.on('data', (chunk) => {
    console.log(chunk)
  })

  stream.on('data', (data) => {
    console.error(`stderr: ${data}`);
  });

  stream.on('close', (code) => {
    console.log(`child process exited with code ${code}`);
  });
});