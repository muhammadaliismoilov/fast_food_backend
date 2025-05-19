"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateCategory = void 0;
const category_validator_1 = require("../validator/category.validator");
// Middleware funksiyasi
const validateCategory = (req, res, next) => {
    const { error } = category_validator_1.categorySchema.validate(req.body);
    if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors: errorMessages });
    }
    next();
};
exports.validateCategory = validateCategory;
