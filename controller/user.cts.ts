import {Request,Response, NextFunction } from "express";
import { Users } from "../Model/users.model";
import { ICreeateUsers } from "../dto/create_user_dto";
import { IUpdateUsers } from "../dto/update_user_dto";
import { Op } from "sequelize";

export const getAllUsers = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const foundAll = await Users.findAll()
        res.status(200).json(foundAll)
    } catch (error:any) {
        next(error)
    }
}

export const getOneUser = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const foundOne = await Users.findByPk(+req.params.id as number)
    if (!foundOne) res.status(404).json({mesage:"Foydalanuvchi topilmadi"})
        res.status(200).json(foundOne)
    } catch (error:any) {
        next(error)
    }
}

export const searchUser = async (req:Request,res:Response,next:NextFunction) =>{
    try {
        const searchTerm = req.query.fullName as string; 
        if (!searchTerm) {
            return res.status(400).json({ message: "Qidiruv so'zi kiritilmagan" });
        }
        const user = await Users.findAll({
            where: {
                fullName: {
                    [Op.like]: `%${searchTerm}%`
                }
            }
        });
        if (!user || user.length === 0) {
            return res.status(404).json({ message: "Foydalanuvchi topilmadi" });
        }
        res.status(200).json(user);
    } catch (error:any) {
        next(error)
    }
}

export const createUser = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const founded = await Users.findOne({where:{phoneNumber: req.body.phoneNumber }});
        if (founded) {
            return res.status(400).json({ message: "Foydalanuvchi bazada mavjud" });
        }
        const createUser = await Users.create(req.body) as ICreeateUsers
        res.status(200).json({message:"Yangi foydalanuvchi qo`shildi",createUser});
    } catch (error: any) {
        next(error);
    }
};

export const updateUser = async (req:Request,res:Response,next:NextFunction) =>{
    try {
        const {fullName,phoneNumber,orderCount,blocked} = req.body as IUpdateUsers
    const brancheId = await Users.findByPk(+req.params.id as number)
    if (!brancheId) res.status(404).json({mesage:"Filial topilmadi"})
        brancheId?.update({fullName,phoneNumber,orderCount,blocked})
        res.status(200).json({message:"Filial ma`lumotlari yangilandi"})
    } catch (error:any) {
        next(error)
    }
}

export const deleteUser = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const userId = await Users.findByPk(+req.params.id as number)
    if (!userId) res.status(404).json({mesage:"Foydalanuvch topilmadi"})
        await Users.destroy({where :{id:+req.params.id}})
        res.status(200).json({message:"Foydalanuvchi ma`lumotlari o`chirildi"})
    } catch (error:any) {
        next(error)
    }
}