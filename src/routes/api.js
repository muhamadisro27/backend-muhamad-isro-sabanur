import express from 'express';
import {
    buyProduct,
    createProduct,
    customerTransactions,
    deleteProduct,
    updateProduct
} from "../controller/product.controller.js"
import {
    authMiddleware
} from "../middleware/auth-middleware.js"


const authRouter = express.Router()

authRouter.post("/api/products", authMiddleware, createProduct)
authRouter.put("/api/products/:id", authMiddleware, updateProduct)
authRouter.delete("/api/products/:id", authMiddleware, deleteProduct)

authRouter.get("/api/transaction/customers", authMiddleware, customerTransactions)
authRouter.post("/api/products/buy", authMiddleware, buyProduct)


export {
    authRouter
}