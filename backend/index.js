const express = require('express')
const mongoose = require('mongoose')
const cors = require('cors')
require('dotenv').config()

const app = express()

app.use(cors())
app.use(express.json())
app.use('/api/auth', require('./routes/authRoutes'))
app.use('/api/purchase', require('./routes/purchaseRoutes'))
app.use('/api/transfer', require('./routes/transferRoutes'))
app.use('/api/assignment', require('./routes/assignmentRoutes'))
app.use('/api/dashboard', require('./routes/dashboardRoutes'))

mongoose.connect(process.env.MONGO_URI)
.then(() => console.log("DB Connected"))
.catch(err => console.log(err))


app.get('/', (req, res) => {
  res.send("API Running")
})

app.listen(3000, () => {
  console.log("Server running on port 3000")
})