const mongoose = require('mongoose')

const logSchema = new mongoose.Schema({
  action: String,
  user: String,
  details: Object,
  timestamp: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Log', logSchema)