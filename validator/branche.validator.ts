import Joi from 'joi';
export const branchValidationSchema = Joi.object({
    brancheName: Joi.string().min(5).max(100).required().messages({
            'string.base': 'Filial nomi matn bo`lishi kerak',
            'string.empty': 'Filial nomi bo`sh bo`lmasligi kerak',
            'string.min': 'Filial nomi 5 ta belgidan kam bolmasligi kerak',
            'string.max': 'Filial nomi 100 ta belgidan ko`p bolmasligi kerak',
            'any.required': 'Filial nomi kiritilishi shart'
        }),
    brancheAround: Joi.string().min(5).max(300).required().messages({
            'string.base': 'Filial atrofidagi ma`lumot matn bo`lishi kerak',
            'string.empty': 'Filial atrofidagi ma`lumot bo`sh bo`lmasligi kerak',
            'string.min': 'Filial atrofidagi ma`lumot 5 ta belgidan kam bolmasligi kerak',
            'string.max': 'Filial atrofidagi ma`lumot 300 ta belgidan ko`p bolmasligi kerak',
            'any.required': 'Filial atrofidagi ma`lumot kiritilishi shart'
        }),
    workingTime: Joi.string().min(5).max(100).required().messages({
            'string.base': 'Ish vaqti matn bo`lishi kerak',
            'string.empty': 'Ish vaqti bo`sh bo`lmasligi kerak',
            'string.min': 'Ish vaqti 5 ta belgidan kam bolmasligi kerak',
            'string.max': 'Ish vaqti 100 ta belgidan ko`p bolmasligi kerak',
            'any.required': 'Ish vaqti kiritilishi shart'
        }),
    location: Joi.string().min(5).max(1000).required().messages({
            'string.base': 'Manzil matn bo`lishi kerak',
            'string.empty': 'Manzil bo`sh bo`lmasligi kerak',
            'string.min': 'Manzil nomi 5 ta belgidan kam bolmasligi kerak',
            'string.max': 'Manzil nomi 1000 ta belgidan ko`p bolmasligi kerak',
            'any.required': 'Manzil kiritilishi shart'
        })
});