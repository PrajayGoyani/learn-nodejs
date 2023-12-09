// Set up rate limiting variables
const MAX_REQUESTS = 60; // Maximum number of requests allowed per minute
const INTERVAL = 60000; // Time interval in milliseconds (1 minute)

let tokens = MAX_REQUESTS; // Available tokens for requests
let lastRefill = Date.now(); // Timestamp of last token refill

// Middleware for rate limiting
const rateLimiter = (req, res, next) => {
    // Calculate time elapsed since last token refill
    const currentTime = Date.now();
    const elapsedTime = currentTime - lastRefill;

    // Refill the tokens if the time interval has passed
    if (elapsedTime > INTERVAL) {
        tokens = MAX_REQUESTS;
        lastRefill = currentTime;
    }

    // Check if there are enough tokens for the current request
    if (tokens > 0) {
        tokens--;
        next();
    } else {
        // Return an error response if the limit is exceeded
        res.status(429).json({error: 'Too Many Requests'});
    }
};

module.exports = rateLimiter;