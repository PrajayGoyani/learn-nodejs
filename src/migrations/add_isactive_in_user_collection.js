const User = require('../models/User');

module.exports = {
    // Add a new field "isActive" to the "users" collection
    up: async () => {
        try {
            await User.updateMany({}, {$set: {isActive: true}});
        } catch (error) {
            throw error;
        }
    },
    // Rollback the migration by removing the "isActive" field
    down: async () => {
        try {
            // await User.updateMany({}, { $unset: { isActive: true } });
        } catch (error) {
            throw error;
        }
    },
};
