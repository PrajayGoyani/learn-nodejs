// app.js

require('dotenv').config();
const express = require('express');
const app = express();
const connectDB = require('./config/db');
const sessionMiddleware = require('./config/session');
const rateLimiter = require('./middleware/throttel');
const bodyParser = require('body-parser');
const path = require('node:path');

// Serve static files from the "public" folder
app.use(express.static(path.join(__dirname, '../public')));

// Connect to the MongoDB server
connectDB();

// Set up session middleware
app.use(sessionMiddleware);

// Apply rate limiter middleware to all routes
app.use(rateLimiter);

// Set up body-parser middleware
app.use(bodyParser.urlencoded({ limit: '50mb', extended: true }));
app.use(bodyParser.json({ limit: '50mb', extended: true }));

// Set up EJS as the view engine
app.set('view engine', 'ejs');
app.set('views', __dirname + '/views');

// Define routes
const authRoutes = require('./routes/auth');
app.use('/', authRoutes);

// Define API routes
const apiRoutes = require('./routes/api');
app.use('/api', apiRoutes);


// Example route
app.get('/api/data', (req, res) => {
  // Your route logic here
  res.json({ message: 'Success' });
});


module.exports = app; // Export the app instance


// body parser
// app.use(cors({
// 	origin: '*'
// }));
// app.use(responseTime());