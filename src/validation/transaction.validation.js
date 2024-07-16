import Joi from "joi"

export const buyProductValidation = Joi.object({
    product_id: Joi.number().positive().required(),
    quantity: Joi.number().positive().required(),
})