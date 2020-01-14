const mongoose = require('mongoose')

const postSchema = mongoose.Schema({
  userId: { type: String, required: true },
  userName: { type: String, required: true },
  postTitle: { type: String, required: true },
  postDescription: { type: String, required: true },
  articleUrlToImage: { type: String, required: false },
  createdAt: { type: Date, required: true }
})

module.exports = mongoose.model('ForumPost', postSchema)
