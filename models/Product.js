const mongoose = require('mongoose');

const productSchema = mongoose.Schema({
    title: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    mrp: {
        type: Number,
        required: true
    },
    currentPrice: {
        type: Number,
        required: true
    },
    images: {
        type: [String],
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    soldBy: {
        type: mongoose.Schema.Types.String,
        ref: 'User'
    },
    size: {
        type: [Number],
        required: true
    },
    fabric: {
        type: String,
        required: true
    },
    stock: {
        type: Number,
        required: true
    },
    rating: {
        type: Number,
        required: true
    }
})

module.exports = mongoose.model("Product", productSchema);