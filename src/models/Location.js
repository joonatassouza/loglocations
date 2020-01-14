const mongoose = require('mongoose');

const LocationSchema = new mongoose.Schema({
  when: String,
  timestamp: Number,
  altitude: Number,
  longitude: Number,
  latitude: Number,
  speed: Number,
  accuracy: Number
}, {
  timestamps: true,
});

module.exports = mongoose.model('Location', LocationSchema);