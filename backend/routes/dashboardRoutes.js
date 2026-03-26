const express = require('express')
const router = express.Router()

const Purchase = require('../models/Purchase')
const Transfer = require('../models/Transfer')
const Assignment = require('../models/Assignment')

const auth = require('../middleware/auth')

router.get('/', auth, async (req, res) => {
  try {
    const { base, assetId } = req.query

    // Purchases
    const purchases = await Purchase.find({ base, assetId })
    const purchaseQty = purchases.reduce((sum, p) => sum + p.quantity, 0)

    // Transfer In
    const transferIn = await Transfer.find({ toBase: base, assetId })
    const transferInQty = transferIn.reduce((sum, t) => sum + t.quantity, 0)

    // Transfer Out
    const transferOut = await Transfer.find({ fromBase: base, assetId })
    const transferOutQty = transferOut.reduce((sum, t) => sum + t.quantity, 0)

    // Assigned
    const assigned = await Assignment.find({ base, assetId, type: 'assigned' })
    const assignedQty = assigned.reduce((sum, a) => sum + a.quantity, 0)

    // Expended
    const expended = await Assignment.find({ base, assetId, type: 'expended' })
    const expendedQty = expended.reduce((sum, a) => sum + a.quantity, 0)

    // Calculations
    const opening = 0
    const netMovement = purchaseQty + transferInQty - transferOutQty
    const closing = opening + netMovement - assignedQty - expendedQty

    res.json({
      opening,
      purchases: purchaseQty,
      transferIn: transferInQty,
      transferOut: transferOutQty,
      assigned: assignedQty,
      expended: expendedQty,
      netMovement,
      closing
    })

  } catch (err) {
    console.log(err)
    res.status(500).json({ error: err.message })
  }
})

module.exports = router