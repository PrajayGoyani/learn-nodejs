const path = require('path');
require('dotenv').config({ path: path.join(__dirname, '../.env') });
const connectDB = require('./config/db');
const mongoose = require('mongoose');
const fs = require('fs');

const runMigrations = async () => {
  try {
    const migrationsPath = path.join(__dirname, 'migrations');
    const migrationFiles = fs.readdirSync(migrationsPath);

    for (const migrationFile of migrationFiles) {
      const migrationFilePath = path.join(migrationsPath, migrationFile);
      const migration = require(migrationFilePath);

      if (typeof migration.up === 'function') {
        console.log(`\nRunning migration ${migrationFile}...`);
        await migration.up();
        console.log(`Migration ${migrationFile} executed successfully!`);
      }
    }
  } catch (error) {
    console.error(['Error running migrations:', error]);
  } finally {
    mongoose.connection.close();
  }
};

const rollbackMigrations = async () => {
  try {
    const migrationsPath = path.join(__dirname, 'migrations');
    const migrationFiles = fs.readdirSync(migrationsPath);

    for (const migrationFile of migrationFiles) {
      const migrationFilePath = path.join(migrationsPath, migrationFile);
      const migration = require(migrationFilePath);

      if (typeof migration.down === 'function') {
        console.log(`\nRolling back migration ${migrationFile}...`);
        await migration.down();
        console.log(`Rollback for migration ${migrationFile} executed successfully!`);
      }
    }
  } catch (error) {
    console.error(['Error rolling back migrations:', error]);
  } finally {
    mongoose.connection.close();
  }
};

// Uncomment the appropriate line to run migrations or rollbacks
connectDB().then(runMigrations).catch((error) => console.error('Error:', error));
// connectDB().then(rollbackMigrations).catch((error) => console.error('Error:', error));