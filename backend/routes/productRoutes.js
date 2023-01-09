import { Router } from "express";
import { adminProtect, protect } from "../middleware/authMiddleware.js"
import { deleteProduct, getProductById, getProducts } from "../controllers/productController.js";

const router = Router();

router
    .get('/', getProducts)
router.route('/:id')
    .get(getProductById)
    .delete(protect, adminProtect, deleteProduct)

export default router;