const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: String,
    breed: String,
    description: String,
    image: String,
    goodWithKids: Boolean,
    goodWithDogs: Boolean,
    goodWithCats: Boolean,
    favoritedBy: [String]
})

const Pet = mongoose.model('pawsrus', petSchema)

module.exports = Pet;