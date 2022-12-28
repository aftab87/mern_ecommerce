import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    rating: {
        type: Number,
        required: true
    },
    comment: {
        type: String,
        required: true
    }
}, {
    timestamps: true
})

const productSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    category: {
        type: String,
        default: true
    },
    description: {
        type: String,
        default: true
    },
    reviews: {
        type: [reviewSchema]
    },
    rating: {
        type: Number,
        default: true,
        default: 0
    },
    numReviews: {
        type: Number,
        default: true,
        default: 0
    },
    price: {
        type: Number,
        default: true,
        default: 0
    },
    countInStock: {
        type: Number,
        default: true,
        default: 0
    },
}, {
    timestamps: true // Automatically creates the createdAt and updatedAt fields
})

const Product = mongoose.model('Product', productSchema);

export default Product;