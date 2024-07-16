import express from "express"
import {
    getAllProducts
} from "../controller/product.controller.js"

const publicRouter = express.Router()

publicRouter.get("/api/products", getAllProducts)

export {
    publicRouter
}