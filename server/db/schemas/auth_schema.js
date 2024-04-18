const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const userModel = new Schema({
  googleId: {
    type: String,
    required: true
  },
  displayName: {
    type: String,
    required: true
  },
  profileImage: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  rank: {
    type: String,
    default: "Admin"
  },
});
module.exports = mongoose.model('user', userModel);