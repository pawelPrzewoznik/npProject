const mongoose = require('mongoose')

const articleSchema = mongoose.Schema({
  userId: { type: String, required: false },
  articleTitle: { type: String, required: false },
  articleDescription: { type: String, required: false },
  articleUrlToImage: { type: String, required: false },
  comment: { type: Number, required: true },
  commentId: { type: String, required: false }
})

module.exports = mongoose.model('Article', articleSchema)
