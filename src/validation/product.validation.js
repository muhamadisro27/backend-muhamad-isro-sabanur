import Joi from "joi";

export const createProductValidation = Joi.object({
    name: Joi.string().max(191).required(),
    price: Joi.number().positive().required(),
    quantity: Joi.number().positive().required(),
});

export const updateProductValidation = Joi.object({
    id: Joi.number().positive().required(),
    name: Joi.string().max(191).optional(),
    price: Joi.number().positive().optional(),
    quantity: Joi.number().positive().optional(),
});