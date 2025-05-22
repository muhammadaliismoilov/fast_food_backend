import Joi from "joi";
interface ReportData {
  brancheName: string;
  orderQuantity: number;
  client: string;
  date?: Date; 
}
export const reportSchema = Joi.object<ReportData>({
  brancheName: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Filial nomi bo`sh bo`lmasligi kerak",
    "string.base": "Filial nomi matn bo`lishi kerak",
    "string.min": "Filial nomi kamida 2 belgidan iborat bo`lishi kerak",
    "string.max": "Filial nomi 100 belgidan oshmasligi kerak",
    "any.required": "Filial nomi kiritilishi shart",
  }),
  orderQuantity: Joi.number().greater(0).required().messages({
    "number.base": "Buyurtma soni raqam bo`lishi kerak",
    "number.greater": "Buyurtma soni 0 dan katta bo`lishi kerak",
    "any.required": "Buyurtma soni kiritilishi shart",
  }),
  client: Joi.string().min(2).max(100).required().messages({
    "string.empty": "Mijoz nomi bo`sh bo`lmasligi kerak",
    "string.base": "Mijoz nomi matn bo`lishi kerak",
    "string.min": "Mijoz nomi kamida 2 belgidan iborat bo`lishi kerak",
    "string.max": "Mijoz nomi 100 belgidan oshmasligi kerak",
    "any.required": "Mijoz nomi kiritilishi shart",
  }),
  date: Joi.date().default(() => new Date()).messages({
    "date.base": "Sana to`g`ri sana bo`lishi kerak",
  }),
}).options({ abortEarly: false });

export const validateReport = (data: ReportData) => {
  return reportSchema.validate(data);
};