import { Request, Response, NextFunction } from 'express';
import BaseError from '../utils/base.error';

interface ErrorResponse {
  status: number;
  message: string;
  errors?: string | object | string[];
}

// Xato middleware funksiyasi
const errorMiddleware = (
  err: BaseError | Error,
  req: Request,
  res: Response,
  next: NextFunction
): void => {
  // Xatolik BaseError turida bo‘lsa
  if (err instanceof BaseError) {
    res.status(err.status).json({
      message: err.message,
      errors: err.errors,
    });
    return;
  }

  // Xatolik Mongoose ValidationError bo‘lsa
  if (err.name === 'ValidationError') {
    const errorMessages = Object.values((err as any).errors).map((error: any) => error.message);
    res.status(400).json({
      message: 'Validation Error',
      errors: errorMessages,
    });
    return;
  }

  // JWT yoki autentifikatsiya bilan bog‘liq xatoliklar
  if (err.name === 'JsonWebTokenError') {
    res.status(401).json({
      message: 'Invalid token',
    });
    return;
  }

  if (err.name === 'TokenExpiredError') {
    res.status(401).json({
      message: 'Token has expired',
    });
    return;
  }

  // Umumiy xatoliklar (500 Internal Server Error)
  res.status(500).json({
    message: 'Server error',
    errors: [err.message || 'Unexpected error occurred'],
  });
};

export default errorMiddleware;