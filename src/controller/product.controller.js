import productService from "../service/product.service.js"
import transactionService from "../service/transaction.service.js"

export const getAllProducts = async (req, res, next) => {
    try {
        const result = await productService.getAllProducts();

        return res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const createProduct = async (req, res, next) => {
    try {
        const result = await productService.createProduct(req.user, req.body);

        return res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const updateProduct = async (req, res, next) => {
    try {
        const request = {
            ...req.body,
            ...{
                id: req.params.id
            }
        }

        const result = await productService.updateProduct(req.user, request);

        return res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const deleteProduct = async (req, res, next) => {
    try {
        await productService.deleteProduct(req.user, req.params.id);

        return res.status(200).json({
            data: "OK"
        })
    } catch (error) {
        next(error)
    }
}

export const buyProduct = async (req, res, next) => {
    try {
        const result = await transactionService.buyProduct(req.user, req.body);

        return res.status(200).json({
            data: result
        })
    } catch (error) {
        next(error)
    }
}

export const customerTransactions = async (req, res, next) => {
    try {
        const result = await transactionService.getTransactionProducts(req.user);

        const data = result.map(r => {
            return {
                id: r.id,
                product_name: r.product.name,
                customer_name: r.customer.user.name,
                quantity: r.quantity,
                total_price: r.total_price,
                date: r.date,
                discount: r.discount,
                shipping_cost: r.shippingCost
            }
        })

        return res.status(200).json(data)
    } catch (error) {
        next(error)
    }
}