import express from 'express';
import {
    createProduct,
    updateProduct
} from "../controller/product.controller.js"
import {
    authMiddleware
} from "../middleware/auth-middleware.js"


const authRouter = express.Router()

authRouter.post("/api/products", authMiddleware, createProduct)
authRouter.put("/api/products/:id", authMiddleware, updateProduct)

export {
    authRouter
}