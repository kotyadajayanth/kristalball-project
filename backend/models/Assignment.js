const mongoose = require('mongoose')

const assignmentSchema = new mongoose.Schema({
  assetId: String,
  base: String,
  quantity: Number,
  type: {
    type: String,
    enum: ['assigned', 'expended']
  },
  date: {
    type: Date,
    default: Date.now
  }
})

module.exports = mongoose.model('Assignment', assignmentSchema)