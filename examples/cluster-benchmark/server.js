const cluster = require('cluster');
const numCPUs = require('os').cpus().length;
const express = require('express');

// Create an Express app
const app = express();

// Define a sample route
app.get('/', (req, res) => {
  res.send('Hello, World!');
});

// Configure clustering
if (cluster.isMaster) {
  // Fork workers based on the number of CPU cores
  for (let i = 0; i < numCPUs; i++) {
    cluster.fork();
  }

  // Log worker exit event
  cluster.on('exit', (worker, code, signal) => {
    console.log(`Worker ${worker.process.pid} exited with code ${code} and signal ${signal}`);
    // You can perform additional actions here if needed
  });

  // Handle SIGINT event
  process.on('SIGINT', () => {
    console.log('Received SIGINT signal. Shutting down gracefully...');
    
    // Perform cleanup tasks and release resources
    // Example: Closing database connections, stopping server, etc.

    // Exit the process
    process.exit(0);
  });
} else {
  // Workers will handle the requests
  const server = app.listen(8000, () => {
    console.log(`Worker ${cluster.worker.id} listening on port ${server.address().port}`);
  });
}
