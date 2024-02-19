const mongoose = require('mongoose')

const productSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    price: {
        type: Number,
    },
    image: {
        type: String,
    },
    imgDesc: {
        type: String,
    },
    seller: {
        type: String,
    }
})

module.exports = mongoose.model("products", productSchema)
