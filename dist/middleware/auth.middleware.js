"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.validateAdmin = void 0;
const auth_validator_1 = require("../validator/auth.validator");
const validateAdmin = (req, res, next) => {
    const { error } = auth_validator_1.adminSchema.validate(req.body);
    if (error) {
        const errorMessages = error.details.map((detail) => detail.message);
        return res.status(400).json({ errors: errorMessages });
    }
    next();
};
exports.validateAdmin = validateAdmin;
