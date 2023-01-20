import Joi from 'joi';

export const UserValidationSchema = Joi.object({
    age: Joi.number()
        .min(4)
        .max(130)
        .required(),
    login: Joi.string().required(),
    password: Joi.string()
        .regex(/^(?=.*[0-9])(?=.*[a-zA-Z])([a-zA-Z0-9]+)$/)
        .messages({
            'string.pattern.base': 'Password must contain letters and numbers'
        })
        .required(),
    isDeleted: Joi.boolean().required()
});
