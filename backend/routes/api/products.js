import { Router } from "express";
import asyncHandler from 'express-async-handler';
import Product from '../../models/productModel.js';
const router = Router();

// @desc    Fetch all Products
// @route   GET /api/products
// @access  Public
router.get('/', asyncHandler(async (req, res) => {
    Product.find({})
        .then(products => {
            return products && products.length > 0
                ? res.json(products)
                : res.status(404).json({ msg: 'No products found!' })
        })
        .catch(e => res.status(400).json(e))
}))

// @desc    Fetch a product by its ID
// @route   GET /api/products/:id
// @access  Public
router.get('/:id', asyncHandler(async (req, res) => {
    Product.findById(req.params.id)
        .then(p => {
            return p
                ? res.json(p)
                : res.status(404).json({ msg: 'Product not found' });
        })
        .catch(e => res.status(400).json(e));
}))

export default router;