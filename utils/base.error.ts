class BaseError extends Error {
  public status: number;
  public message: string;
  public errors: string | object;

  // Konstruktor: xato holati, xabar va qo‘shimcha xatolar uchun
  constructor(status: number, message: string, errors: string | object = '') {
    super(message);
    this.status = status;
    this.message = message;
    this.errors = errors;

    // Xato prototip zanjirini to‘g‘ri sozlash
    Object.setPrototypeOf(this, BaseError.prototype);
  }

  // BadRequest: 400 xato holati uchun statik metod
  static BadRequest(status: number = 400, message: string, errors: string | object = ''): BaseError {
    return new BaseError(status, message, errors);
  }

  // Unauthorized: 401 xato holati uchun statik metod
  static Unauthorized(status: number = 401, message: string, errors: string | object = ''): BaseError {
    return new BaseError(status, message, errors);
  }
}
export default BaseError;
