import {Request,Response, NextFunction } from "express";
import { Admins } from "../Model/auth.model";
import bcryptjs from "bcryptjs"
import { AccessToken, RefreshToken } from "../utils/token.generate";

export const login = async (req:Request,res:Response,next:NextFunction) =>{
    try { 
        const {login,password} = req.body
        if (!login || !password) {
        return res.status(400).json({message:"login va parol yuborilishi kerak!"})
       }
    const found = await Admins.findOne({where:{login}})
    if(!found) return res.status(401).json({message:"Topilmadi"})
    const decode =  await bcryptjs.compare(password, found.password)
    if(!decode) return res.status(401).json({message:"Login yoki parol xato!"})
    const payload = {
      id: found.id,
      login: found.login,
      role: found.role
    }
    const access = AccessToken(payload);
    const refresh = RefreshToken(payload);
    res.cookie("accessToken", access, {
      httpOnly: true,
      maxAge: 30 * 60 * 1000,
    });
    res.cookie("refreshToken", refresh, {
      httpOnly: true,
      maxAge: 7 * 24 * 60 * 60 * 1000,
    });
    return res.status(200).json({message:"Tizimga muvaffaqiyatli kirdingiz",access})
    } catch (error:any) {
        next(error)
    }
}

export const logout = async (req:Request,res:Response,next:NextFunction) =>{
    try { 
       const { login } = req.body;
    if (!login) {
      return res.status(400).json({ message: "Email kerak!" });
    }

    const found = await Admins.findOne({where:{login}});
    if (!found) {
      return res.status(404).json({ message: "Foydalanuvchi topilmadi!" });
    }
    res.clearCookie("accessToken", { httpOnly: true });
    res.clearCookie("refreshToken", { httpOnly: true });
    return res.status(200).json({
      message: "Tizimdan muvaffaqiyatli chiqdingiz!",
    });
    } catch (error:any) {
        next(error)
    }
}


export const getAllAdmins = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const findAll = await Admins.findAll()
        return res.status(200).json(findAll)
    } catch (error:any) {
        next(error)
    }
}

export const getOneAdmin = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const findAdmin = await Admins.findByPk(+req.params.id as number)
    if (!findAdmin) res.status(404).json({mesage:"Admin topilmadi"})
        return res.status(200).json(findAdmin)
    } catch (error:any) {
        next(error)
    }
}

export const createAdmin = async (req:Request,res:Response,next:NextFunction) =>{
    try {
        const {login,password} = req.body
        const findLogin = await Admins.findOne({where:{login: req.body.login}})
        if (findLogin) return res.status(400).json({message:"Login bazada mavjud"})
        const hashed = await bcryptjs.hash(password,10)
        const newAdmin = await Admins.create({
            login,
            password:hashed,
            role:"admin"
        })
        return res.status(201).json({message:"Admin qo`shildi",newAdmin})

    } catch (error:any) {
        next(error)
    }
}

export const updateAdmin = async (req:Request,res:Response,next:NextFunction) =>{
    try {
        const { login, password } = req.body;
        const findAdmin = await Admins.findByPk(+req.params.id);
        if (!findAdmin) return res.status(404).json({ message: "Admin topilmadi" });
        const updates: { login?: string; hashed?: string } = {};
        if (login) updates.login = login;
        if (password) {
            const hashed = await bcryptjs.hash(password, 10);
            updates.hashed = hashed; 
        }
        if (!login && !password) return res.status(400).json({ message: "Hech qanday ma'lumot kiritilmadi" });
        await findAdmin.update(updates);
        return res.status(200).json({ message: "Admin ma'lumotlari yangilandi", admin: findAdmin });
    } catch (error:any) {
        next(error)
    }
}

export const deleteAdmin = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const findAdmin = await Admins.findByPk(+req.params.id as number)
    if (!findAdmin) res.status(404).json({mesage:"Admin topilmadi"})
    findAdmin?.destroy()
        return res.status(200).json({message:"Admin muvoffaqiyatli o`chirildi"})
    } catch (error:any) {
        next(error)
    }
}













