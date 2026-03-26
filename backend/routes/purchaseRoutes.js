const express = require('express')
const router = express.Router()

const Purchase = require('../models/Purchase')
const Asset = require('../models/Asset')
const Log = require('../models/Log')

const auth = require('../middleware/auth')
const role = require('../middleware/role')

router.post('/', auth, role(['admin', 'logistics']), async (req, res) => {
  try {
    const { assetId, base, quantity } = req.body

    // Save purchase
    await Purchase.create({ assetId, base, quantity })

    // Update asset
    let asset = await Asset.findOne({ name: assetId, base })

    if (!asset) {
      asset = await Asset.create({
        name: assetId,
        base,
        quantity
      })
    } else {
      asset.quantity += quantity
      await asset.save()
    }

    // Log action
    await Log.create({
      action: "purchase",
      user: req.user.id,
      details: req.body
    })

    res.json({ msg: "Purchase recorded successfully" })

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router