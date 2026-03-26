const express = require('express')
const router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const User = require('../models/User')

router.post('/register', async (req, res) => {
  try {
    const { name, email, password, role, base } = req.body

    const hashed = await bcrypt.hash(password, 10)

    const user = await User.create({
      name,
      email,
      password: hashed,
      role,
      base
    })

    res.json(user)
  } catch (err) {
  console.log(err)
  res.status(500).json({ error: err.message })
}
})

router.post('/login', async (req, res) => {
  try {
    const { email, password } = req.body

    const user = await User.findOne({ email })
    if (!user) return res.status(400).json({ msg: "User not found" })

    const isMatch = await bcrypt.compare(password, user.password)
    if (!isMatch) return res.status(400).json({ msg: "Wrong password" })

    const token = jwt.sign(
      { id: user._id, role: user.role, base: user.base },
      process.env.JWT_SECRET
    )

    res.json({ token })
  } catch (err) {
    res.status(500).json({ error: err.message })
  }
})

module.exports = router