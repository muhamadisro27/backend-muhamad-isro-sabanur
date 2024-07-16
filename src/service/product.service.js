import {
    prismaClient
} from "../app/database.js"
import {
    ResponseError
} from "../error/response-error.js"
import {
    validate
} from "../validation/validation.js";
import {
    createProductValidation
} from "../validation/product.validation.js"

const getAllProducts = async () => {
    return prismaClient.product.findMany({
        select: {
            id: true,
            name: true,
            price: true,
            quantity: true,
        }
    })
}

const createProduct = async (user, request) => {
    if (user.role !== 'MERCHANT') {
        throw new ResponseError(403, "Access Denied!")
    }

    const validateRequest = validate(createProductValidation, request)

    const product = await prismaClient.product.create({
        data: {
            name: validateRequest.name,
            price: validateRequest.price,
            quantity: validateRequest.quantity,
            merchantId: user.merchantId
        },
        select: {
            id: true,
            name: true,
            price: true,
            quantity: true,
        }
    })

    return product
}

export default {
    getAllProducts,
    createProduct
}