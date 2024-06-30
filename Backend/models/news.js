const mongoose = require('mongoose')

const NewsSchema =new mongoose.Schema(
{
  email: String,
  bookmarked: Object
})

const NewsModel= mongoose.model("news", NewsSchema)
module.exports= NewsModel

