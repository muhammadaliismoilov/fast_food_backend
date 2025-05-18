import Joi from "joi";
export const categorySchema = Joi.object({
    category: Joi.string().min(2) .max(50).required() .messages({
            "string.empty": "Kategoriya nomi bo'sh bo'lmasligi kerak",
            "string.base":"Kategoriya stringda kiritilishi kerak!",
            "string.min": "Kategoriya nomi kamida 2 belgidan iborat bo'lishi kerak",
            "string.max": "Kategoriya nomi 50 belgidan oshmasligi kerak",
            "any.required": "Kategoriya nomi kiritilishi shart",
        }),
}).options({ abortEarly: false }); 