const express = require('express')
const router = express.Router()

const Transfer = require('../models/Transfer')
const Asset = require('../models/Asset')
const Log = require('../models/Log')

const auth = require('../middleware/auth')
const role = require('../middleware/role')

router.post('/', auth, role(['admin', 'logistics']), async (req, res) => {
  try {
    const { assetId, fromBase, toBase, quantity } = req.body

    // Save transfer
    await Transfer.create({ assetId, fromBase, toBase, quantity })

    // Reduce fromBase
    const fromAsset = await Asset.findOne({ name: assetId, base: fromBase })

    if (!fromAsset || fromAsset.quantity < quantity) {
      return res.status(400).json({ msg: "Insufficient assets" })
    }

    fromAsset.quantity -= quantity
    await fromAsset.save()

    // Add toBase
    let toAsset = await Asset.findOne({ name: assetId, base: toBase })

    if (!toAsset) {
      toAsset = await Asset.create({
        name: assetId,
        base: toBase,
        quantity
      })
    } else {
      toAsset.quantity += quantity
      await toAsset.save()
    }

    // Log
    await Log.create({
      action: "transfer",
      user: req.user.id,
      details: req.body
    })

    res.json({ msg: "Transfer successful" })

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router