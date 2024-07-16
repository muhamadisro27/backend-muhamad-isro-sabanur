import {
    prismaClient
} from "../app/database.js";
import {
    ResponseError
} from "../error/response-error.js"
import {
    buyProductValidation
} from "../validation/transaction.validation.js";
import {
    validate
} from "../validation/validation.js";

const buyProduct = async (user, request) => {
    validateRoleCustomer(user)

    const validateRequest = validate(buyProductValidation, request);

    const product = await prismaClient.product.findFirst({
        where: {
            id: validateRequest.product_id,
        }
    })

    if (!product) {
        throw new ResponseError(404, "Product not found")
    }

    if (product.quantity == 0 || validateRequest.quantity > product.quantity) {
        throw new ResponseError(400, "Product stock is not available")
    }
    
    await prismaClient.product.update({
        where: {
            id: validateRequest.product_id
        },
        data: {
            quantity: (product.quantity - validateRequest.quantity)
        }
    })

    let discount = 0;
    let shippingCost = 5000;
    let total_price = product.price * validateRequest.quantity;

    if (total_price >= 15000) {
        shippingCost = 0;
    } else {
        total_price += shippingCost;
    }

    if (total_price >= 50000) {
        discount += 10;
        const discount_price = total_price * (discount / 100)
        total_price -= discount_price
    }

    const transaction = await prismaClient.transaction.create({
        data: {
            customerId: user.customerId,
            productId: product.id,
            discount,
            shippingCost,
            quantity: validateRequest.quantity,
            price_product: product.price,
            total_price,
            date: new Date()
        }
    })

    console.log(new Date().toISOString())

    return transaction;

}

const validateRoleCustomer = (user) => {
    if (user.role !== 'CUSTOMER') {
        throw new ResponseError(403, "Access Denied!")
    }
    return
}

export default {
    buyProduct
}