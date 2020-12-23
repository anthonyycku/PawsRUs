const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: String,
    breed: String,
    description: String,
    likes: [String],
    dislikes: [String],
    image: String
})

const Pet = mongoose.model('pawsrus', petSchema)

module.exports = Pet;