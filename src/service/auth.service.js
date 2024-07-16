import {
    validate
} from "../validation/validation.js"
import {
    loginValidation,
    registerValidation
} from "../validation/auth.validation.js"
import {
    prismaClient
} from "../app/database.js"
import {
    ResponseError
} from "../error/response-error.js"
import jwt from "jsonwebtoken"
import bcrypt from "bcrypt"

const register = async (request) => {
    const validateRequest = validate(registerValidation, request)

    const hashedPassword = await bcrypt.hash(validateRequest.password, 10);

    const checkUserExist = await prismaClient.user.count({
        where: {
            email: request.email
        }
    })

    if (checkUserExist > 0) {
        throw new ResponseError(400, "User already exists")
    }

    const user = await prismaClient.user.create({
        data: {
            name: validateRequest.name,
            email: validateRequest.email,
            password: hashedPassword,
            role: validateRequest.role
        },
        select: {
            id: true,
            email: true,
            name: true
        }
    });

    if (request.role === 'CUSTOMER') {
        await prismaClient.customer.create({
            data: {
                userId: user.id
            }
        });
    } else if (request.role === 'MERCHANT') {
        await prismaClient.merchant.create({
            data: {
                userId: user.id
            }
        });
    }

    return user;
}

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
    } else {
        const customer = await prismaClient.customer.findUnique({
            where: {
                userId: user.id,
            }
        })

        payload.customerId = customer.id
    }

    const token = jwt.sign(payload, 'SECRET_KEY')

    return {
        token
    }
}


export default {
    login,
    register
}