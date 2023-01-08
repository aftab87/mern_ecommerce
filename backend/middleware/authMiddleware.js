import expressAsyncHandler from "express-async-handler"
import jwt from "jsonwebtoken"
import User from "../models/userModel.js"

const protect = expressAsyncHandler(async (req, res, next) => {
    let incToken = req.headers.authorization
    if (incToken && incToken.startsWith("Bearer")) {
        try {
            let token = incToken.split(" ")[1]
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.id).select("-password")
        } catch (e) {
            res.status(401)
            throw new Error("Not authorized. Invalid Token!")
        }
    } else if (!incToken) {
        res.status(401)
        throw new Error("Not authorized")
    } else {
        res.status(401)
        throw new Error("Not authorized. Invalid Token!")
    }

    next()
})

const adminProtect = (req, res, next) => {
    if (req.user && req.user.isAdmin)
        next()
    else {
        res.status(401)
        throw new Error("Not authorized")
    }
}

export { protect, adminProtect }
