// config/db.js

const mongoose = require('mongoose');

const MONGODB_URI = process.env.NODE_ENV === 'prod' ? 'MONGODB_URI_LIVE' : 'MONGODB_URI_LOCAL';
const url = `${process.env[MONGODB_URI]}/login-register-app`;
const options = {useNewUrlParser: true, useUnifiedTopology: true, /*useCreateIndex: true*/};

const connectDB = async () => {
    try {
        await mongoose.connect(url, options);
        console.log('Connected to MongoDB');
    } catch (error) {
        console.error('Error connecting to MongoDB:', error);
    }
};

module.exports = connectDB;

console.log(['MONGODB_CONN_STRING', url]);