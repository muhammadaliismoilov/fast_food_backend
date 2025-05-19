import { Request, Response, NextFunction } from 'express';
import { ValidationResult } from 'joi';
import { branchValidationSchema } from '../validator/branche.validator';

interface ValidationErrorDetail {
    message: string;
}
interface ValidationErrorResponse {
    errors: string[];
}
export const validateBranche = (
    req: Request,
    res: Response,
    next: NextFunction
): any => {
    const { error }: ValidationResult = branchValidationSchema.validate(req.body);
    if (error) {
        const errorMessages: string[] = error.details.map(
            (detail: ValidationErrorDetail) => detail.message
        );
        return res.status(400).json({ errors: errorMessages } as ValidationErrorResponse);
    }
    next();
};