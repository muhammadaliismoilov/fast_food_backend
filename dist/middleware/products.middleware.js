"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateProduct = void 0;
const product_validator_1 = require("../validator/product.validator");
const validateProduct = (req, res, next) => {
    const { error } = product_validator_1.productSchema.validate(req.body);
    if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors: errorMessages });
    }
    next();
};
exports.validateProduct = validateProduct;
