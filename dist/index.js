"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
const auth_routes_1 = __importDefault(require("./routers/auth.routes"));
const producte_routes_1 = __importDefault(require("./routers/producte.routes"));
const category_routes_1 = __importDefault(require("./routers/category.routes"));
const logger_1 = __importDefault(require("./utils/logger"));
const app = (0, express_1.default)();
app.use((0, cors_1.default)({ credentials: true, origin: "*" }));
app.use(express_1.default.json());
dotenv_1.default.config();
const PORT = process.env.PORT || 3005;
/// routers
app.use(auth_routes_1.default);
app.use(producte_routes_1.default);
app.use(category_routes_1.default);
app.use((req, res, next) => {
    res.status(404).json({
        message: "Bunday endpoint mavjud emas!",
    });
});
app.listen(PORT, () => {
    console.log("Server ishladi  " + PORT);
    logger_1.default.info(`Server ${PORT} da ishladi`);
});
