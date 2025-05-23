import {Request,Response, NextFunction } from "express";
import { Products } from "../Model/products.model";
import { Categorys } from "../Model/categorys.models";
import { Users } from "../Model/users.model";
import { Branches } from "../Model/branches.model";
import { Order } from "../Model/orders.model";
import { Op } from "sequelize";
import BaseError from "../utils/base.error";
import { ICreateOrder } from "../dto/create_order_dto";
import { IUpdateOrder } from "../dto/update_order_dto";

export const getAllOrder = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const orders = await Order.findAll()
        res.status(200).json(orders)
    } catch (error:any) {
        next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));
    }
}

export const getOneOrder = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const order = await Order.findByPk(+req.params.id as number,{
      include: [
          {
            model: Users,
            as: 'orderUser', 
            attributes: [ 'fullName'], 
          },
        {
          model: Products,
          as: 'orderProduct', 
          attributes: [ 'productName'],
        },
        {
          model: Categorys,
          as: 'orderCategory',
          attributes: ['category'],
        },
        {
          model: Branches,
          as: 'orderBranche', 
          attributes: [ 'brancheName'], 
        },
      ],
    })
    if (!order) {
      throw new BaseError(404, "Buyurtma topilmadi!");
    }
    // const responseOrder = { //// shu joyini ishlata olmadm
    //   id: order.id,
    //   userId: order.userId,
    //   userName: order.orderUser?.fullName || 'Noma\'lum', // Mos aliasdan foydalanish
    //   productId: order.productId,
    //   productName: order.orderProduct?.productName || 'Noma\'lum', // Mos aliasdan foydalanish
    //   categoryId: order.categoryId,
    //   categoryName: order.orderCategory?.category || 'Noma\'lum', // Mos aliasdan foydalanish
    //   brancheId: order.brancheId,
    //   brancheName: order.orderBranche?.brancheName || 'Noma\'lum', // Mos aliasdan foydalanish
    //   position: order.position,
    // };
    if (!order) throw BaseError.BadRequest(404, "Buyurtma topilmadi");
        res.status(200).json(order)
    } catch (error:any) {
        next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));
    }
}

export const searchProduct = async (req:Request,res:Response,next:NextFunction) =>{
    try {
        const searchTerm = req.query.productName as string; 
        if (!searchTerm) {
            throw BaseError.BadRequest(400, "Qidiruv so'zi kiritilmagan");
        }
        const products = await Products.findAll({
            where: {
                productName: {
                    [Op.like]: `%${searchTerm}%`
                }
            }
        });

        if (!products || products.length === 0) {
            throw BaseError.BadRequest(404, "Mahsulot topilmadi");
        }

        res.status(200).json(products);

    } catch (error:any) {
        next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));
    }
}


export const createOrder = async(req:Request,res:Response,next:NextFunction) =>{
    try {
    const { userId, productId, categoryId, brancheId, position } = req.body as ICreateOrder;
    const foundCategory = await Categorys.findOne({ where: { id: categoryId } });
    if (!foundCategory) throw new BaseError(400, "Kategoriya bazada mavjud emas!")
    const foundUser = await Users.findOne({ where: { id: userId } });
    if (!foundUser) throw new BaseError(400, "Foydalanuvchi bazada mavjud emas!")
    const foundProduct = await Products.findOne({ where: { id: productId } });
    if (!foundProduct) throw new BaseError(400, "Mahsulot bazada mavjud emas!")
    const foundBranch = await Branches.findOne({ where: { id: brancheId } });
    if (!foundBranch) throw new BaseError(400, "Filial bazada mavjud emas!")
    const order = await Order.create({
      userId,
      productId,
      categoryId,
      brancheId,
      position: position || 'yangi', 
    });
    const responseOrder = {
      id: order.id,
      userName: foundUser.fullName, 
      productName: foundProduct.productName, 
      categoryName: foundCategory.category, 
      brancheName: foundBranch.brancheName, 
      userId: order.userId,
      productId: order.productId,
      categoryId: order.categoryId,
      brancheId: order.brancheId,
    };
    res.status(200).json({ message: "Yangi buyurtma qo‘shildi", order: responseOrder })
  } catch (error: any) {
    next(error instanceof BaseError ? error : new BaseError(500, 'Ichki server xatosi', error.message));
  }
}

export const updateOrder = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const orderId = req.params.id;
    if (!orderId) {
      throw new BaseError(400, "Buyurtma ID si taqdim etilmadi!");
    }
    const { userId, productId, categoryId, brancheId, position } = req.body as IUpdateOrder;
    const order = await Order.findByPk(orderId, {
      include: [
        { model: Users, as: 'orderUser', attributes: ['fullName'] },
        { model: Products, as: 'orderProduct', attributes: ['productName'] },
        { model: Categorys, as: 'orderCategory', attributes: ['category'] },
        { model: Branches, as: 'orderBranche', attributes: ['brancheName'] },
      ],
    });
    if (!order) throw new BaseError(404, "Buyurtma topilmadi!")
    const foundUser = await Users.findOne({ where: { id: userId } });
    if (!foundUser) throw new BaseError(400, "Foydalanuvchi bazada mavjud emas!")
    const foundProduct = await Products.findOne({ where: { id: productId } });
    if (!foundProduct) throw new BaseError(400, "Mahsulot bazada mavjud emas!")
    const foundCategory = await Categorys.findOne({ where: { id: categoryId } });
    if (!foundCategory) throw new BaseError(400, "Kategoriya bazada mavjud emas!")
    const foundBranch = await Branches.findOne({ where: { id: brancheId } });
    if (!foundBranch) throw new BaseError(400, "Filial bazada mavjud emas!")
    const updatedOrder = await order.update({
      userId,
      productId,
      categoryId,
      brancheId,
      position: position || 'yangi',
    });
    const responseOrder = {
      id: updatedOrder.id,
      userName: foundUser.fullName || 'Noma\'lum',
      productName: foundProduct.productName || 'Noma\'lum',
      categoryName: foundCategory.category || 'Noma\'lum',
      brancheName: foundBranch.brancheName || 'Noma\'lum',
      position: updatedOrder.position,
    };

    res.status(200).json({ message: "Ma'lumotlar yangilandi", order: responseOrder });
    } catch (error:any) {
        next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));
    }
}

export const deleteOrder = async (req:Request,res:Response,next:NextFunction) =>{
    try {
    const order = await Order.findByPk(+req.params.id as number)
    if (!order) throw BaseError.BadRequest(404, "Mahsulot topilmadi");
       await Order.destroy({where :{id:+req.params.id}})
        res.status(200).json({message:"Buyutrma bekor qilindi"})
    } catch (error:any) {
        next(error instanceof BaseError ? error : BaseError.BadRequest(500, 'Ichki server xatosi', error.message));
    }
}


