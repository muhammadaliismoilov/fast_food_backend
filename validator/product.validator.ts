import Joi from "joi";
export const productSchema = Joi.object({
  productName: Joi.string()
    .min(2) 
    .max(100) 
    .required() 
    .messages({
      "string.empty": "Mahsulot nomi bo'sh bo'lmasligi kerak",
      "string.base":"mahsulot nomi stringda kiritilishi kerak!",
      "string.min": "Mahsulot nomi kamida 2 belgidan iborat bo'lishi kerak",
      "string.max": "Mahsulot nomi 100 belgidan oshmasligi kerak",
      "any.required": "Mahsulot nomi kiritilishi shart",
    }),
  category: Joi.string()
    .min(2) 
    .max(50) 
    .required() 
    .messages({
      "string.empty": "Kategoriya bo'sh bo'lmasligi kerak",
      "string.base":"Kategoriya stringda kiritilishi kerak!",
      "string.min": "Kategoriya kamida 2 belgidan iborat bo'lishi kerak",
      "string.max": "Kategoriya 50 belgidan oshmasligi kerak",
      "any.required": "Kategoriya kiritilishi shart",
    }),
  price: Joi.number()
    .greater(0) 
    .required() 
    .messages({
      "number.base": "Narx raqam bo'lishi kerak",
      "number.greater": "Narx 0 dan katta bo'lishi kerak",
      "any.required": "Narx kiritilishi shart",
    }),
  description: Joi.string()
    .max(500) 
    .required()  
    .optional() 
    .messages({
        "string.base":"Tavsif stringda kiritilishi kerak!",
      "string.max": "Tavsif 500 belgidan oshmasligi kerak",
    }),
}).options({ abortEarly: false }); 
