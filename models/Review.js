const mongoose = require('mongoose');

const reviewSchema = mongoose.Schema({
    product: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product'
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    rating: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true
    },
    description: {
        type: String
    },
    images: {
        type: [String]
    },
    likes: {
        type: Number,
        defalut: 0
    },
    comments: {
        type: [
            {
                userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
                name: String,
                comment: String
            }
        ]
    }
});

module.exports = mongoose.model('Review', reviewSchema)