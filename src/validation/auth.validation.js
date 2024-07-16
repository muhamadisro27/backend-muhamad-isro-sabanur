import Joi from "joi";

export const registerValidation = Joi.object({
    name: Joi.string().min(1).max(191).required(),
    email: Joi.string().min(1).max(191).email().required(),
    password: Joi.string().required(),
    role: Joi.string().required(),
})

export const loginValidation = Joi.object({
    email: Joi.string().min(1).max(191).email().required(),
    password: Joi.string().required(),
})