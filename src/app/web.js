import express from "express"
import {
    authRouter
} from "../routes/api.js";
import {
    publicRouter
} from "../routes/public-api.js";

export const web = express()

web.use(express.json())

web.use(publicRouter)

web.use(authRouter)