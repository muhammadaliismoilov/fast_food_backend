import { Request, Response, NextFunction } from 'express';
import { ValidationResult } from 'joi';
import { userValidationSchema } from '../validator/user.validator';
interface ValidationErrorDetail {
  message: string;
}
interface ValidationErrorResponse {
  errors: string[];
}
export const validateUser = (
  req: Request,
  res: Response,
  next: NextFunction
): any => {
 const { error }: ValidationResult = userValidationSchema.validate(req.body, { abortEarly: false });
  if (error) {
   const errorMessages: string[] = error.details.map(
      (detail: ValidationErrorDetail) => detail.message
    );
   return res.status(400).json({ errors: errorMessages } as ValidationErrorResponse);
  }
  next();
};
