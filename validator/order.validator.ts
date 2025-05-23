import Joi from "joi";

export const orderSchema = Joi.object({
  userId: Joi.number().required().messages({
      "number.empty": "Foydalanuvchi ID si bo'sh bo'lmasligi kerak",
      "number.base": "Foydalanuvchi ID si raqamda kiritilishi kerak!",
      "any.required": "Foydalanuvchi ID si kiritilishi shart",
    }),
  productId: Joi.number().required().messages({
      "number.empty": "Mahsulot ID si bo'sh bo'lmasligi kerak",
      "number.base": "Mahsulot ID si raqamda kiritilishi kerak!",
      "any.required": "Mahsulot ID si kiritilishi shart",
    }),
  categoryId: Joi.number().required().messages({
      "number.empty": "Kategoriya ID si bo'sh bo'lmasligi kerak",
      "number.base": "Kategoriya ID si raqamda kiritilishi kerak!",
      "any.required": "Kategoriya ID si kiritilishi shart",
    }),
  brancheId: Joi.number().required().messages({
      "number.empty": "Filial ID si bo'sh bo'lmasligi kerak",
      "number.base": "Filial ID si raqamda kiritilishi kerak!",
      "any.required": "Filial ID si kiritilishi shart",
    }),
  position: Joi.string().valid("yangi", "qabul qilingan", "jo`natilgan", "yopilgan").messages({
      "string.empty": "Buyurtma holati bo'sh bo'lmasligi kerak",
      "string.base": "Buyurtma holati stringda kiritilishi kerak!",
      "any.only": "Buyurtma holati faqat 'yangi', 'qabul qilingan', 'jo`natilgan' yoki 'yopilgan' bo'lishi mumkin",
    }),
}).options({ abortEarly: false });