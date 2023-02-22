const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
  bio: {
    type: String,
    default: '',
  },
  image: {
    type: Buffer,
  },
  service: {
    type: String,
    enum: ['service1', 'service2'],
  },
});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;

