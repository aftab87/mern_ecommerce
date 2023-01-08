import { Router } from "express"
import {
    authUser,
    deleteUser,
    getUserById,
    getUserProfile,
    getUsers,
    registerUser,
    updateProfileById,
    updateUserProfile,
} from "../controllers/userController.js"
import { adminProtect, protect } from "../middleware/authMiddleware.js"

const router = Router()

router
    .post("/login", authUser)

router
    .route("/profile")
    .get(protect, getUserProfile)
    .put(protect, updateUserProfile)

router.route("/:id")
    .get(protect, adminProtect, getUserById)
    .put(protect, adminProtect, updateProfileById)
    .delete(protect, adminProtect, deleteUser)

router
    .route("/")
    .post(registerUser)
    .get(protect, adminProtect, getUsers)


export default router
