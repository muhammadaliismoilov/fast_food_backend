import { RequestHandler, Router } from "express";
import { createCategory, deleteCategory, getAllCategorys, getOneCategory, searchCategory, updateCategory } from "../controller/categorys.ctr";
import { validateCategory } from "../middleware/categorys.middleware";
import { chekAdmin,chekSuperadmin} from "../middleware/chekAdmin";
const categorysRouter = Router()

/**
 * @swagger
 * /get_categorys:
 *   get:
 *     summary: Barcha kategoriyalarni olish
 *     description: Tizimdagi barcha kategoriyalar ro‘yxatini qaytaradi.
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Kategoriyalar ro‘yxati muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Kategoriya ID
 *                     example: "123e4567-e89b-12d3-a456-426614174000"
 *                   category:
 *                     type: string
 *                     description: Kategoriya nomi
 *                     example: "Fast Food"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Kategoriya yaratilgan vaqt
 *                     example: "2025-05-23T10:41:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Kategoriya oxirgi yangilangan vaqt
 *                     example: "2025-05-23T10:41:00Z"
 *       500:
 *         description: Ichki server xatosi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Ichki server xatosi"
 *                 details:
 *                   type: string
 *                   example: "Xato haqida qo'shimcha ma'lumot"
 */
categorysRouter.get("/get_categorys",getAllCategorys as RequestHandler)

/**
 * @swagger
 * /get_one_category/{id}:
 *   get:
 *     summary: Bitta kategoriyani ID bo‘yicha olish
 *     description: Ma'lum bir kategoriyani va uning mahsulotlarini ID bo‘yicha qaytaradi.
 *     tags: [Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Kategoriya ID
 *     responses:
 *       200:
 *         description: Kategoriya muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Kategoriya ID
 *                   example: "123e4567-e89b-12d3-a456-426614174000"
 *                 category:
 *                   type: string
 *                   description: Kategoriya nomi
 *                   example: "Fast Food"
 *                 products:
 *                   type: array
 *                   items:
 *                     type: object
 *                     properties:
 *                       id:
 *                         type: string
 *                         description: Mahsulot ID
 *                         example: "prod-001"
 *                       productName:
 *                         type: string
 *                         description: Mahsulot nomi
 *                         example: "Burger"
 *                       createdAt:
 *                         type: string
 *                         format: date-time
 *                         description: Mahsulot yaratilgan vaqt
 *                         example: "2025-05-23T10:41:00Z"
 *                       updatedAt:
 *                         type: string
 *                         format: date-time
 *                         description: Mahsulot oxirgi yangilangan vaqt
 *                         example: "2025-05-23T10:41:00Z"
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Kategoriya yaratilgan vaqt
 *                   example: "2025-05-23T10:41:00Z"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Kategoriya oxirgi yangilangan vaqt
 *                   example: "2025-05-23T10:41:00Z"
 *       500:
 *         description: Ichki server xatosi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Ichki server xatosi"
 *                 details:
 *                   type: string
 *                   example: "Xato haqida qo'shimcha ma'lumot"
 */
categorysRouter.get("/get_one_category/:id",getOneCategory as RequestHandler)

/**
 * @swagger
 * /search_category/search:
 *   get:
 *     summary: Kategoriyalarni qidirish
 *     description: Kategoriya nomiga ko‘ra qidiruv amalga oshiradi.
 *     tags: [Categories]
 *     parameters:
 *       - name: category
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Qidiruv so‘zi
 *     responses:
 *       200:
 *         description: Qidiruv natijalari muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Kategoriya ID
 *                     example: "123e4567-e89b-12d3-a456-426614174000"
 *                   category:
 *                     type: string
 *                     description: Kategoriya nomi
 *                     example: "Fast Food"
 *                   products:
 *                     type: array
 *                     items:
 *                       type: object
 *                       properties:
 *                         id:
 *                           type: string
 *                           description: Mahsulot ID
 *                           example: "prod-001"
 *                         productName:
 *                           type: string
 *                           description: Mahsulot nomi
 *                           example: "Burger"
 *                         createdAt:
 *                           type: string
 *                           format: date-time
 *                           description: Mahsulot yaratilgan vaqt
 *                           example: "2025-05-23T10:41:00Z"
 *                         updatedAt:
 *                           type: string
 *                           format: date-time
 *                           description: Mahsulot oxirgi yangilangan vaqt
 *                           example: "2025-05-23T10:41:00Z"
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Kategoriya yaratilgan vaqt
 *                     example: "2025-05-23T10:41:00Z"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Kategoriya oxirgi yangilangan vaqt
 *                     example: "2025-05-23T10:41:00Z"
 *       400:
 *         description: Qidiruv so‘zi kiritilmagan
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Qidiruv so'zi kiritilmagan"
 *                 details:
 *                   type: string
 *                   example: "Xato haqida qo'shimcha ma'lumot"
 *       404:
 *         description: Kategoriya topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Kategoriya topilmadi"
 *                 details:
 *                   type: string
 *                   example: "Xato haqida qo'shimcha ma'lumot"
 *       500:
 *         description: Ichki server xatosi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Ichki server xatosi"
 *                 details:
 *                   type: string
 *                   example: "Xato haqida qo'shimcha ma'lumot"
 */
categorysRouter.get("/search_category",searchCategory as RequestHandler)

/**
 * @swagger
 * /create_categorys:
 *   post:
 *     summary: Yangi kategoriya qo‘shish
 *     description: Yangi kategoriyani bazaga qo‘shadi, agar u avvaldan mavjud bo‘lmasa.
 *     tags: [Categories]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: Kategoriya nomi
 *                 example: "Fast Food"
 *             required:
 *               - category
 *     responses:
 *       200:
 *         description: Kategoriya muvaffaqiyatli qo‘shildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Yangi categorya qo`shildi"
 *                 category:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Kategoriya ID
 *                       example: "123e4567-e89b-12d3-a456-426614174000"
 *                     category:
 *                       type: string
 *                       description: Kategoriya nomi
 *                       example: "Fast Food"
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Kategoriya yaratilgan vaqt
 *                       example: "2025-05-23T10:41:00Z"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Kategoriya oxirgi yangilangan vaqt
 *                       example: "2025-05-23T10:41:00Z"
 *       400:
 *         description: Kategoriya avvaldan mavjud
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 400
 *                 message:
 *                   type: string
 *                   example: "Bu kategoriya bazada mavjud"
 *                 details:
 *                   type: string
 *                   example: "Xato haqida qo'shimcha ma'lumot"
 *       500:
 *         description: Ichki server xatosi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Ichki server xatosi"
 *                 details:
 *                   type: string
 *                   example: "Xato haqida qo'shimcha ma'lumot"
 */
categorysRouter.post("/create_categorys",chekAdmin as RequestHandler,validateCategory as RequestHandler,createCategory as RequestHandler)

/**
 * @swagger
 * /update_category/{id}:
 *   put:
 *     summary: Kategoriyani yangilash
 *     description: Ma'lum bir kategoriyani ID bo‘yicha yangilaydi.
 *     tags: [Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Kategoriya ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               category:
 *                 type: string
 *                 description: Yangi kategoriya nomi
 *                 example: "Fast Food Updated"
 *             required:
 *               - category
 *     responses:
 *       200:
 *         description: Kategoriya muvaffaqiyatli yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ma`lumot yangilandi"
 *       404:
 *         description: Kategoriya topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Categorya topilmadi"
 *                 details:
 *                   type: string
 *                   example: "Xato haqida qo'shimcha ma'lumot"
 *       500:
 *         description: Ichki server xatosi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Ichki server xatosi"
 *                 details:
 *                   type: string
 *                   example: "Xato haqida qo'shimcha ma'lumot"
 */
categorysRouter.put("/update_category/:id",chekAdmin as RequestHandler,updateCategory as RequestHandler)

/**
 * @swagger
 * /delete_category/{id}:
 *   delete:
 *     summary: Kategoriyani o‘chirish
 *     description: Ma'lum bir kategoriyani va unga tegishli mahsulotlarni ID bo‘yicha o‘chiradi.
 *     tags: [Categories]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Kategoriya ID
 *     responses:
 *       200:
 *         description: Kategoriya muvaffaqiyatli o‘chirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Ma`lumot o`chirildi"
 *       404:
 *         description: Kategoriya topilmadi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 404
 *                 message:
 *                   type: string
 *                   example: "Categorya topilmadi"
 *                 details:
 *                   type: string
 *                   example: "Xato haqida qo'shimcha ma'lumot"
 *       500:
 *         description: Ichki server xatosi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 500
 *                 message:
 *                   type: string
 *                   example: "Ichki server xatosi"
 *                 details:
 *                   type: string
 *                   example: "Xato haqida qo'shimcha ma'lumot"
 */
categorysRouter.delete("/delete_category/:id",chekAdmin as RequestHandler,deleteCategory as RequestHandler)
export default categorysRouter
