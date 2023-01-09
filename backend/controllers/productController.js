import asyncHandler from 'express-async-handler'
import Product from '../models/productModel.js'

// @desc    Fetch all Products
// @route   GET /api/products
// @access  Public
export const getProducts = asyncHandler(async (req, res) => {
    const products = await Product.find({})
    res.json(products)
})

// @desc    Fetch a product by its ID
// @route   GET /api/products/:id
// @access  Public
export const getProductById = asyncHandler(async (req, res) => {
    const product = await Product.findById(req.params.id)
    if (product)
        res.json(product)
    else {
        res.status(404)
        throw new Error('Product not found')
    }
})

// @desc    Delete a product by its ID
// @route   DELETE /api/products/:id
// @access  Admin
export const deleteProduct = asyncHandler(async (req, res) => {
    const id = req.params.id

    const product = await Product.findById(id)
    if (product) {
        if (product.user.toString() !== req.user._id.toString()) {
            res.status(401)
            throw new Error('Cannot delete this product! You did not create it!')
        } else if (id === "63abb5fd98b24a20c3457e07"
            || id === "63abb5fd98b24a20c3457e08"
            || id === "63abb5fd98b24a20c3457e09"
            || id === "63abb5fd98b24a20c3457e0a"
            || id === "63abb5fd98b24a20c3457e0b"
            || id === "63abb5fd98b24a20c3457e0c"
        ) {
            res.status(401)
            throw new Error(`Cannot delete product with id ${id}.`)
        }

        await product.remove();
        const products = await Product.find({})
        res.json(products)
    } else {
        res.status(404)
        throw new Error('Product not found')
    }
})
