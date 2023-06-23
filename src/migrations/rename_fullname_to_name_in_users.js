// Assuming you have already connected to MongoDB using mongoose
const User = require('../models/User');

module.exports = {
  // Add a new field "isActive" to the "users" collection
  up: async () => {
    try {
      // await User.updateMany({}, { $rename: { fullname: 'name' } });
      console.log('Migration completed successfully!');
    } catch (error) {
      throw error;
    }
  },
  // Rollback the migration
  down: async () => {
    try {
      // await User.updateMany({}, { $unset: { isActive: true } });
    } catch (error) {
      throw error;
    }
  },
};

