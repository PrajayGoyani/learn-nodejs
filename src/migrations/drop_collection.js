// Assuming you have already connected to MongoDB using mongoose
const mongoose = require('mongoose');

// Perform your migration logic here This can include modifying the schema, updating documents, etc.
module.exports = {
    // Drop the "oldCollection" collection
    up: async () => {
        try {
            // Obtain a reference to the MongoDB database
            const db = mongoose.connection.db;
            await db.collection('oldCollection').drop();

        } catch (error) {
            throw error;
        } finally {
            // Close the database connection
            mongoose.connection.close();
        }
    },
    down: async () => {
        try {
            // Rollback the migration

        } catch (error) {
            throw error;
        }
    },
};
