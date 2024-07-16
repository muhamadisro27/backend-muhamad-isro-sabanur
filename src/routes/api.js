import express from 'express';
import {
    createProduct
} from "../controller/product.controller.js"
import {
    authMiddleware
} from "../middleware/auth-middleware.js"


const authRouter = express.Router()

authRouter.post("/api/products", authMiddleware, createProduct)

export {
    authRouter
}