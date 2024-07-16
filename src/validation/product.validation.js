import Joi from "joi";

export const createProductValidation = Joi.object({
    name: Joi.string().max(191).required(),
    price: Joi.number().positive().required(),
    quantity: Joi.number().positive().required(),
});