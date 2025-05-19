import Joi from 'joi';

export const userValidationSchema = Joi.object({
  fullName: Joi.string().required().min(2).max(100).messages({
      'string.base': 'Ism matn bo`lishi kerak',
      'string.empty': 'Ism bo`sh bo`lmasligi kerak',
      'string.min': 'Ism kamida 2 ta belgidan iborat bo`lishi kerak',
      'string.max': 'Ism 100 belgidan oshmasligi kerak',
      'any.required': 'Ism kiritilishi shart',
    }),
  phoneNumber: Joi.string().required().pattern(/^\+?[1-9]\d{1,14}$/).messages({
      'string.base': 'Telefon raqami matn bo`lishi kerak',
      'string.empty': 'Telefon raqami bo`sh bo`lmasligi kerak',
      'string.pattern.base': 'Telefon raqami noto`g`ri formatda',
      'any.required': 'Telefon raqami kiritilishi shart',
    }),
  orderCount: Joi.number().integer().min(0).optional().messages({
      'number.base': 'Buyurtmalar soni raqam bo`lishi kerak',
      'number.integer': 'Buyurtmalar soni butun son bo`lishi kerak',
      'number.min': 'Buyurtmalar soni 0 dan kam bo`lmasligi kerak',
    }),
  blocked: Joi.boolean().messages({
      'boolean.base': 'Bloklangan holati true/false bo`lishi kerak',
    }),
});