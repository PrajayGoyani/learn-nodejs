const mongoose = require("mongoose");

// User Detail Schema
const userDetailSchema = new mongoose.Schema({
  userid: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: "User",
  },
  fname: {
    type: String,
    required: true,
    maxlength: 255,
  },
  lname: {
    type: String,
    required: true,
    maxlength: 255,
  },
  gender: {
    type: String,
    enum: ["male", "female"],
  },
  joindate: {
    type: Date,
    default: Date.now,
  },
});
const UserDetail = mongoose.model("UserDetail", userDetailSchema);

module.exports = UserDetail;


// UserDetail.findOne({ userid: userId })
//   .populate('userid')
//   .exec(function (err, userDetail) {
//     if (err) {
//       // Handle error
//       return res.status(500).send(err);
//     }
    
//     if (!userDetail) {
//       // UserDetail not found
//       return res.status(404).send('UserDetail not found');
//     }
    
//     // Access the populated User document
//     const user = userDetail.userid;
    
//     // Perform operations with the join data
//     // For example, you can access user.name, user.email, etc.
    
//     // Return the result
//     return res.send({ userDetail, user });
//   });