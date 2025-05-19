import Joi from "joi";  
export const adminSchema = Joi.object({
    login: Joi.string().min(3) .max(50) .required() .messages({
            "string.empty": "Login bo'sh bo'lmasligi kerak",
            "string.base": "Login stringda kerak",
            "string.min": "Login kamida 3 belgidan iborat bo'lishi kerak",
            "string.max": "Login 50 belgidan oshmasligi kerak",
            "any.required": "Login kiritilishi shart",
        }),
    password: Joi.string().min(6).max(100) .required() .messages({
            "string.empty": "Parol bo'sh bo'lmasligi kerak",
            "string.base": "Parol stringda kerak",
            "string.min": "Parol kamida 6 belgidan iborat bo'lishi kerak",
            "string.max": "Parol 100 belgidan oshmasligi kerak",
            "any.required": "Parol kiritilishi shart",
        }),
    role: Joi.string().valid("admin", "superadmin").required().messages({
            "string.base": "Role stringda kerak",
            "any.only": "Role faqat 'admin' yoki 'superadmin' bo'lishi mumkin",
            "any.required": "Role kiritilishi shart",
        }),
}).options({ abortEarly: false }); 