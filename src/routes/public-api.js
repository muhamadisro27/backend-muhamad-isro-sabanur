import express from "express"
import {
    getAllProducts
} from "../controller/product.controller.js"
import {
    login,
    register
} from "../controller/auth.controller.js"

const publicRouter = express.Router()

publicRouter.get("/api/products", getAllProducts)
publicRouter.post("/api/users/login", login)
publicRouter.post("/api/users/register", register)

export {
    publicRouter
}