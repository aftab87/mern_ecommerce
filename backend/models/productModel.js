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
    created_by: {
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
    num_reviews: {
        type: Number,
        default: true,
        default: 0
    },
    price: {
        type: Number,
        default: true,
        default: 0
    },
    count_in_stock: {
        type: Number,
        default: true,
        default: 0
    },
}, {
    timestamps: true // Automatically creates the created_at and updated_at fields
})

const Product = mongoose.model('Product', productSchema);

export default Product;