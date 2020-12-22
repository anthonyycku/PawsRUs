const mongoose = require('mongoose')

const petSchema = new mongoose.Schema({
    name: String
})

const Pet = mongoose.model('pawsrus', petSchema)

module.exports = Pet;