import { Request, Response,NextFunction } from "express"
import jwt, { Secret, JwtPayload } from "jsonwebtoken";
import dotenv from "dotenv"
dotenv.config()
interface CustomJwtPayload extends JwtPayload {
    id: number;
    login: string;
    role?: string;
}

export const chekSuperadmin = async (req:Request,res:Response,next:NextFunction) =>{
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({message:"Token topilamdi"})
        }
        const ACCESS_SECRET_KEY: Secret = process.env.ACCESS_SECRET_KEY || "your_access_secret_key";
        const accesToken = authHeader.slice(7)
        const decode = jwt.verify(accesToken,ACCESS_SECRET_KEY) as CustomJwtPayload
       if (!decode.role || decode.role !== "superadmin") {
            return res.status(403).json({ message: "Sizda Superadmin huquqlari yo'q" });
        }
    next();
    } catch (error:any) {
        next(error)
    }
}

export const chekAdmin = async (req:Request,res:Response,next:NextFunction) =>{
    try {
        const authHeader = req.headers.authorization
        if (!authHeader || !authHeader.startsWith("Bearer ")) {
        return res.status(401).json({message:"Token topilamdi"})
        }
        const ACCESS_SECRET_KEY: Secret = process.env.ACCESS_SECRET_KEY || "your_access_secret_key";
        const accesToken = authHeader.slice(7)
        const decode = jwt.verify(accesToken,ACCESS_SECRET_KEY) as CustomJwtPayload
       const Roles = ['admin', 'superadmin'];
        if (!decode.role || !Roles.includes(decode.role)) {
        return res.status(403).json({ message: 'Sizda admin huquqlari yo‘q' });
        }
    next();
    } catch (error:any) {
        next(error)
    }
}