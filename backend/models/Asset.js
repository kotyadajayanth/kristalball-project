const mongoose = require('mongoose')

const assetSchema = new mongoose.Schema({
  name: String,
  type: String,
  base: String,
  quantity: {
    type: Number,
    default: 0
  }
})

module.exports = mongoose.model('Asset', assetSchema)