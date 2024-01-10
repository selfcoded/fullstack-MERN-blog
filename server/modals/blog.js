const mongoose = require('mongoose')

const Schema = mongoose.Schema

const BlogSchema = new Schema({
    author: {type: String, require: true, maxLength: 50}
})


module.exports = mongoose.model('Blog', BlogSchema)