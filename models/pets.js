const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    }
})

const Pet = mongoose.model('pawsrus', petSchema)

module.exports = Pet;