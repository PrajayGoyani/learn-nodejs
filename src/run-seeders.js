const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const fs = require('fs');

const runSeeders = async () => {
  try {
    const seedersPath = path.join(__dirname, 'seeders');
    const seederFiles = fs.readdirSync(seedersPath);

    for (const seederFile of seederFiles) {
      const seederFilePath = path.join(seedersPath, seederFile);
      const seeder = require(seederFilePath);

      if (typeof seeder === 'function') {
        console.log(`\nRunning seederFile: ${seederFile}...`);
        await seeder();
        console.log(`Seeder ${seederFile} executed successfully!`);
      }
    }
  } catch (error) {
    console.error(['Error running seeders:', error]);
  } finally {
    mongoose.connection.close();
  }
};


// Connect to MongoDB
connectDB()
  .then(runSeeders)
  .catch((error) => console.error('Error:', error));;