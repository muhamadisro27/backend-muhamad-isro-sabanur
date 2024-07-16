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
    createProductValidation,
    getIdProductValidation,
    updateProductValidation
} from "../validation/product.validation.js"

const getAllProducts = async () => {
    return prismaClient.product.findMany({
        where: {
            deleted_at: null
        },
        select: {
            id: true,
            name: true,
            price: true,
            quantity: true,
        }
    })
}

const createProduct = async (user, request) => {
    validateRoleMerchant(user)

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

const updateProduct = async (user, request) => {
    validateRoleMerchant(user)

    const validateRequest = validate(updateProductValidation, request)

    await checkProductExist(validateRequest.id, user.merchantId);

    const product = await prismaClient.product.update({
        where: {
            id: validateRequest.id,
        },
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

const deleteProduct = async (user, id) => {
    validateRoleMerchant(user)

    const validateRequest = validate(getIdProductValidation, id)

    await checkProductExist(validateRequest.id, user.merchantId);

    return prismaClient.product.update({
        where: {
            id: Number(id)
        },
        data: {
            deleted_at: new Date()
        }
    })
}

export const validateRoleMerchant = (user) => {
    if (user.role !== 'MERCHANT') {
        throw new ResponseError(403, "Access Denied!")
    }
    return
}

const checkProductExist = async (product_id, merchant_id) => {
    const checkProductExist = await prismaClient.product.count({
        where: {
            id: product_id,
            merchantId: merchant_id,
            deleted_at: null
        }
    })

    if (checkProductExist < 1) {
        throw new ResponseError(404, "Product not found")
    }
    return
}

export default {
    getAllProducts,
    createProduct,
    updateProduct,
    deleteProduct
}