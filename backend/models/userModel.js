import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';

const userSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    isAdmin: {
        type: Boolean,
        default: false
    }
}, {
    timestamps: true // Automatically creates the created_at and updated_at fields
})

// used in userController -> authUser()
userSchema.methods.matchPassword = async function (password) {
    return await bcrypt.compare(password, this.password)
}

// Encrypt pw before saving
userSchema.pre('save', async function (next) {
    // Hash only if password field got modified
    if (this.isModified('password')) {
        const salt = await bcrypt.genSalt(10)
        this.password = await bcrypt.hash(this.password, salt)
    }

    next()
})

const User = mongoose.model('User', userSchema);

export default User;