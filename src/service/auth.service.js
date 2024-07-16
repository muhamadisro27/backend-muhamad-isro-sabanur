import {
    validate
} from "../validation/validation.js"
import {
    loginValidation
} from "../validation/auth.validation.js"
import {
    prismaClient
} from "../app/database.js"
import {
    ResponseError
} from "../error/response-error.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const login = async (request) => {
    const validateRequest = validate(loginValidation, request)

    const user = await prismaClient.user.findUnique({
        where: {
            email: validateRequest.email
        }
    })

    if (!user) {
        throw new ResponseError(404, "This credentials is not match with our records!")
    }

    const comparePassword = await bcrypt.compare(validateRequest.password, user.password)
    if (!comparePassword) {
        throw new ResponseError(401, "Unauthorized!")
    }

    const payload = {
        id: user.id,
        role: user.role
    }

    if (user.role == "MERCHANT") {
        const merchant = await prismaClient.merchant.findUnique({
            where: {
                userId: user.id,
            }
        })

        payload.merchantId = merchant.id
    }

    const token = jwt.sign(payload, 'SECRET_KEY')

    return {
        token
    }
}


export default {
    login
}