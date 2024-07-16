import productService from "../service/product.service.js"

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