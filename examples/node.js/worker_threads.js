const { Worker } = require('worker_threads');

// Create a new Worker instance and pass in a JavaScript file
// send initial configuration or input data to the worker thread when it is created.
const worker = new Worker('./worker.js', {
  workerData: 'Initial data',
  eval: false,
  stdin: false,
  stdout: false,
  stderr: true
});

// Listen for messages from the worker thread
worker.on('message', message => {
  console.log('Received message from worker:', message);
});

// Send a message to the worker thread
worker.postMessage('Hello from the main thread!');
