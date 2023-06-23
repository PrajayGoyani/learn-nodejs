// worker.js

const { parentPort, workerData } = require('worker_threads');

console.log('Received initial data:', workerData);

// Listen for messages from the main thread
parentPort.on('message', message => {
  console.log('Received message from main thread:', message);

  // Perform some task in the worker thread
  const result = performTask(message);

  // Send the result back to the main thread
  parentPort.postMessage(result);

  // Close the parent port to signal the worker thread to terminate
  parentPort.close();
});

// Function to perform a task in the worker thread
function performTask(message) {
  // Perform the task here...
  return 'Task completed in worker thread!';
}

// Listen for the exit event
parentPort.on('exit', () => {
  console.log('Worker thread exiting...');
});
