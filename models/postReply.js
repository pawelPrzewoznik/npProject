const mongoose = require('mongoose')

const reply = mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  reply: { type: String, required: true },
  createdAt: { type: Date, required: true }
})

module.exports = mongoose.model('Reply', reply)
