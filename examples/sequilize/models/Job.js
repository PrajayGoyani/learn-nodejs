// models/Job.js

const { DataTypes } = require('sequelize');
const sequelize = require('../database/connection'); // Replace with your database connection configuration

const Job = sequelize.define('Job', {
  title: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  region: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  type: {
    type: DataTypes.ENUM('Full-Time', 'Part-Time'),
    allowNull: true,
  },
  vacancy: {
    type: DataTypes.TINYINT,
    allowNull: true,
  },
  experience: {
    type: DataTypes.TINYINT,
    allowNull: true,
  },
  salary: {
    type: DataTypes.INTEGER.UNSIGNED,
    allowNull: true,
  },
  gender: {
    type: DataTypes.ENUM('Any', 'Male', 'Female'),
    allowNull: true,
  },
  application_deadline: {
    type: DataTypes.DATE,
    allowNull: true,
  },
  job_description: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  responsibilities: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  education_and_experience: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  other_benefits: {
    type: DataTypes.STRING,
    allowNull: true,
  },
});

module.exports = Job;

/*const { DataTypes } = require('sequelize');

const User = sequelize.define('User', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
    unique: true,
    validate: {
      isEmail: true,
    },
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
  },
});
*/
/*sequelize.sync({ force: true }) // Use force: true to drop the existing table if it exists
  .then(() => {
    console.log('Database synchronized');
  })
  .catch((error) => {
    console.error('Unable to synchronize the database:', error);
  });*/
/*User.create({
  username: 'john_doe',
  email: 'john@example.com',
  password: 'secret',
})
  .then((user) => {
    console.log('User created:', user.toJSON());
  })
  .catch((error) => {
    console.error('Error creating user:', error);
  });
*/
/*User.findAll()
  .then((users) => {
    console.log('All users:', users.map((user) => user.toJSON()));
  })
  .catch((error) => {
    console.error('Error fetching users:', error);
  });
*/

/*User.findByPk(1) // Replace 1 with the desired user ID
  .then((user) => {
    if (user) {
      console.log('User found:', user.toJSON());
    } else {
      console.log('User not found');
    }
  })
  .catch((error) => {
    console.error('Error finding user:', error);
  });
*/

/*User.update({ username: 'new_username', },
    {
      where: {
        id: 1, // Specify the user you want to update
      },
    }
  ).then((result) => {
    console.log('Number of updated rows:', result[0]);
  }).catch((error) => {
    console.error('Error updating user:', error);
  });
*/
/*User.destroy({
  where: {
    id: 1, // Specify the user you want to delete
  },
})
  .then((result) => {
    console.log('Number of deleted rows:', result);
  })
  .catch((error) => {
    console.error('Error deleting user:', error);
  });
*/