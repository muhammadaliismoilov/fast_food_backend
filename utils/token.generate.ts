import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()

interface TokenPayload extends JwtPayload {
    id: number;
    login: string;
    role?: string; 
}
const ACCESS_TOKEN_SECRET: Secret =  process.env.ACCESS_SECRET_KEY|| "your_access_secret_key";
const REFRESH_SEKRET_KEY: Secret =process.env.REFRESH_SEKRET_KEY || "your_refresh_secret_key";
// const ACCESS_TOKEN_EXPIRY: string = "15m"; // Access token 15 daqiqa
// const REFRESH_TOKEN_EXPIRY: string = "7d"; // Refresh token 7 kun
export const AccessToken = (payload: TokenPayload): any => {
    return jwt.sign(payload, ACCESS_TOKEN_SECRET, { expiresIn: "30m" });
};

export const RefreshToken = (payload: TokenPayload): string => {
    return jwt.sign(payload,REFRESH_SEKRET_KEY, { expiresIn: "7d" });
};