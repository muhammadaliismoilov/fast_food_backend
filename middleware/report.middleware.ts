import { Request, Response, NextFunction } from "express";
import { ValidationResult } from "joi";
import { reportSchema } from "../validator/report.validator";
interface ValidationErrorDetail {
    message: string;
}
interface ValidationErrorResponse {
    errors: string[];
}
export const validateReports = (
    req: Request,
    res: Response,
    next: NextFunction
): any => {
    const { error }: ValidationResult = reportSchema.validate(req.body);

    if (error) {
        const errorMessages: string[] = error.details.map(
            (detail: ValidationErrorDetail) => detail.message
        );
        return res.status(400).json({ errors: errorMessages } as ValidationErrorResponse);
    }

    next();
};