import {Router} from "express";
import products from '../../data/products.js';

const router = Router();

router.get('/', (req, res) => {
    res.send(products)
})

router.get('/:id', (req, res) => {
    const product = products.find(p => p._id === req.params.id)
    if (!product)
        return res.status(404).json("No product found");

    res.send(product)
})

export default router;