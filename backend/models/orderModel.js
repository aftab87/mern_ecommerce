import mongoose from 'mongoose';

const orderSchema = mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    orderItems: [
        {
            name: {
                type: String,
                required: true
            },
            qty: {
                type: Number,
                required: true
            },
            image: {
                type: String,
                required: true
            },
            price: {
                type: Number,
                required: true
            },
            product: {
                type: mongoose.Schema.Types.ObjectId,
                required: true,
                ref: 'Product'
            },
        }
    ],
    shipping_address: {
        address: {
            type: String,
            required: true
        },
        city: {
            type: String,
            required: true
        },
        postal_code: {
            type: String,
            required: true
        },
        country: {
            type: String,
            required: true
        }
    },
    payment_method: {
        type: String,
        default: false
    },
    payment_result: {
        id: {
            type: String,
        },
        status: {
            type: String
        },
        updated_at: {
            type: String
        },
        email: {
            type: String
        }
    },
    tax_price: {
        type: Number,
        required: true,
        default: 0.0
    },
    shipping_price: {
        type: Number,
        required: true,
        default: 0.0
    },
    total_price: {
        type: Number,
        required: true,
        default: 0.0
    },
    is_paid: {
        type: Boolean,
        required: true,
        default: false
    },
    paid_at: {
        type: Date
    },
    is_delivered: {
        type: Boolean,
        required: true,
        default: false
    },
    delivered_at: {
        type: Date
    },
}, {
    timestamps: true // Automatically creates the created_at and updated_at fields
})

const Order = mongoose.model('Order', orderSchema);

export default Order;