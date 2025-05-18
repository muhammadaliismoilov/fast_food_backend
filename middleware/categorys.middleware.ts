import { Request, Response, NextFunction } from "express";
import { ValidationResult } from "joi";
import { categorySchema } from "../validator/category.validator";

// Tip aniqlash
interface ValidationErrorDetail {
    message: string;
}

interface ValidationErrorResponse {
    errors: string[];
}

// Middleware funksiyasi
export const validateCategory = (
    req: Request,
    res: Response,
    next: NextFunction
): any => {
    const { error }: ValidationResult = categorySchema.validate(req.body);

    if (error) {
        const errorMessages: string[] = error.details.map(
            (detail: ValidationErrorDetail) => detail.message
        );
        return res.status(400).json({ errors: errorMessages } as ValidationErrorResponse);
    }

    next();
};