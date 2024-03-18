const Joi = require("joi");

const validate = (schema, params, res, next) => {
    const { error } = schema.validate(params);

    if (error) {
        console.log({ error: error.details[0].message });
        return res.status(400).json({ error: error.details[0].message });
    }

    next();
};

const validateParamId = (req, res, next) => {
    const schema = Joi.object({
        id: Joi.number().integer().positive().required().messages({
            "number.base": "El ID debe ser un número",
            "number.integer": "El ID debe ser un número entero",
            "number.positive": "El ID debe ser un número positivo",
            "any.required": "El ID es requerido",
        }),
    });

    validate(schema, req.params, res, next);
};

const validateBody = (req, res, next) => {
    const schema = Joi.object({
        title: Joi.string().min(3).max(50).required().messages({
            "string.base": "El título debe ser un texto.",
            "string.empty": "El título no debe estar vacío.",
            "string.min": "El título debe tener al menos {#limit} caracteres.",
            "string.max": "El título no debe tener más de {#limit} caracteres.",
            "any.required": "El título es requerido.",
        }),
        description: Joi.string().min(3).max(255).required().messages({
            "string.base": "La descripción debe ser un texto.",
            "string.empty": "La descripción no debe estar vacía.",
            "string.min": "La descripción debe tener al menos {#limit} caracteres.",
            "string.max": "La descripción no debe tener más de {#limit} caracteres.",
            "any.required": "La descripción es requerida.",
        }),
    });

    validate(schema, req.body, res, next);
};

module.exports = {
    validateParamId,
    validateBody,
};