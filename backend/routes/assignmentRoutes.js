const express = require('express')
const router = express.Router()

const Assignment = require('../models/Assignment')
const Asset = require('../models/Asset')
const Log = require('../models/Log')

const auth = require('../middleware/auth')
const role = require('../middleware/role')

router.post('/', auth, role(['admin', 'commander']), async (req, res) => {
  try {
    const { assetId, base, quantity, type } = req.body

    const asset = await Asset.findOne({ name: assetId, base })

    if (!asset || asset.quantity < quantity) {
      return res.status(400).json({ msg: "Insufficient assets" })
    }

    // Reduce asset
    asset.quantity -= quantity
    await asset.save()

    // Save assignment/expended
    await Assignment.create({ assetId, base, quantity, type })

    // Log
    await Log.create({
      action: type,
      user: req.user.id,
      details: req.body
    })

    res.json({ msg: `${type} recorded successfully` })

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router