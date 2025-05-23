import { RequestHandler, Router } from "express";
import { validateUser } from "../middleware/users.middleware";
import { chekAdmin,chekSuperadmin} from "../middleware/chekAdmin";
import { createUser, deleteUser, getAllUsers, getOneUser, searchUser, updateUser } from "../controller/user.cts";

const userRouter = Router()

/**
 * @swagger
 * /get_users:
 *   get:
 *     summary: Barcha foydalanuvchilarni olish
 *     description: Tizimdagi barcha foydalanuvchilar ro‘yxatini qaytaradi.
 *     tags: [Users]
 *     responses:
 *       200:
 *         description: Foydalanuvchilar ro‘yxati muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: string
 *                     description: Foydalanuvchi ID
 *                     example: "user-001"
 *                   fullName:
 *                     type: string
 *                     description: Foydalanuvchi ismi
 *                     example: "Ali Valiev"
 *                   phoneNumber:
 *                     type: string
 *                     description: Telefon raqami
 *                     example: "+998901234567"
 *                   orderCount:
 *                     type: number
 *                     description: Buyurtma soni
 *                     example: 5
 *                   blocked:
 *                     type: boolean
 *                     description: Bloklangan holati
 *                     example: false
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Foydalanuvchi yaratilgan vaqt
 *                     example: "2025-05-23T11:08:00+05:00"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Foydalanuvchi oxirgi yangilangan vaqt
 *                     example: "2025-05-23T11:08:00+05:00"
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
userRouter.get("/get_users",getAllUsers as RequestHandler)

/**
 * @swagger
 * /get_one_user/{id}:
 *   get:
 *     summary: Bitta foydalanuvchini ID bo‘yicha olish
 *     description: Ma'lum bir foydalanuvchini ID bo‘yicha qaytaradi.
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Foydalanuvchi ID
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: string
 *                   description: Foydalanuvchi ID
 *                   example: "user-001"
 *                 fullName:
 *                   type: string
 *                   description: Foydalanuvchi ismi
 *                   example: "Ali Valiev"
 *                 phoneNumber:
 *                   type: string
 *                   description: Telefon raqami
 *                   example: "+998901234567"
 *                 orderCount:
 *                   type: number
 *                   description: Buyurtma soni
 *                   example: 5
 *                 blocked:
 *                   type: boolean
 *                   description: Bloklangan holati
 *                   example: false
 *                 createdAt:
 *                   type: string
 *                   format: date-time
 *                   description: Foydalanuvchi yaratilgan vaqt
 *                   example: "2025-05-23T11:08:00+05:00"
 *                 updatedAt:
 *                   type: string
 *                   format: date-time
 *                   description: Foydalanuvchi oxirgi yangilangan vaqt
 *                   example: "2025-05-23T11:08:00+05:00"
 *       404:
 *         description: Foydalanuvchi topilmadi
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
 *                   example: "Foydalanuvchi topilmadi"
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
userRouter.get("/get_one_user/:id",getOneUser as RequestHandler)

/**
 * @swagger
 * /search_user:
 *   get:
 *     summary: Foydalanuvchilarni qidirish
 *     description: Foydalanuvchi ismi bo‘yicha qidiruv amalga oshiradi.
 *     tags: [Users]
 *     parameters:
 *       - name: fullName
 *         in: query
 *         required: true
 *         schema:
 *           type: string
 *         description: Qidiruv so‘zi (foydalanuvchi ismi)
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
 *                     description: Foydalanuvchi ID
 *                     example: "user-001"
 *                   fullName:
 *                     type: string
 *                     description: Foydalanuvchi ismi
 *                     example: "Ali Valiev"
 *                   phoneNumber:
 *                     type: string
 *                     description: Telefon raqami
 *                     example: "+998901234567"
 *                   orderCount:
 *                     type: number
 *                     description: Buyurtma soni
 *                     example: 5
 *                   blocked:
 *                     type: boolean
 *                     description: Bloklangan holati
 *                     example: false
 *                   createdAt:
 *                     type: string
 *                     format: date-time
 *                     description: Foydalanuvchi yaratilgan vaqt
 *                     example: "2025-05-23T11:08:00+05:00"
 *                   updatedAt:
 *                     type: string
 *                     format: date-time
 *                     description: Foydalanuvchi oxirgi yangilangan vaqt
 *                     example: "2025-05-23T11:08:00+05:00"
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
 *         description: Foydalanuvchi topilmadi
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
 *                   example: "Foydalanuvchi topilmadi"
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
userRouter.get("/search_user",searchUser as RequestHandler)

/**
 * @swagger
 * /create_user:
 *   post:
 *     summary: Yangi foydalanuvchi qo‘shish
 *     description: Yangi foydalanuvchini bazaga qo‘shadi, agar telefon raqami takrorlanmagan bo‘lsa.
 *     tags: [Users]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Foydalanuvchi ismi
 *                 example: "Ali Valiev"
 *               phoneNumber:
 *                 type: string
 *                 description: Telefon raqami
 *                 example: "+998901234567"
 *               orderCount:
 *                 type: number
 *                 description: Buyurtma soni
 *                 example: 0
 *               blocked:
 *                 type: boolean
 *                 description: Bloklangan holati
 *                 example: false
 *             required:
 *               - fullName
 *               - phoneNumber
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli qo‘shildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Yangi foydalanuvchi qo`shildi"
 *                 createUser:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: string
 *                       description: Foydalanuvchi ID
 *                       example: "user-001"
 *                     fullName:
 *                       type: string
 *                       description: Foydalanuvchi ismi
 *                       example: "Ali Valiev"
 *                     phoneNumber:
 *                       type: string
 *                       description: Telefon raqami
 *                       example: "+998901234567"
 *                     orderCount:
 *                       type: number
 *                       description: Buyurtma soni
 *                       example: 0
 *                     blocked:
 *                       type: boolean
 *                       description: Bloklangan holati
 *                       example: false
 *                     createdAt:
 *                       type: string
 *                       format: date-time
 *                       description: Foydalanuvchi yaratilgan vaqt
 *                       example: "2025-05-23T11:08:00+05:00"
 *                     updatedAt:
 *                       type: string
 *                       format: date-time
 *                       description: Foydalanuvchi oxirgi yangilangan vaqt
 *                       example: "2025-05-23T11:08:00+05:00"
 *       400:
 *         description: Foydalanuvchi bazada mavjud
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
 *                   example: "Foydalanuvchi bazada mavjud"
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
userRouter.post("/create_user",validateUser as RequestHandler,createUser as RequestHandler)

/**
 * @swagger
 * /update_user/{id}:
 *   put:
 *     summary: Foydalanuvchini yangilash
 *     description: Ma'lum bir foydalanuvchini ID bo‘yicha yangilaydi.
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Foydalanuvchi ID
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               fullName:
 *                 type: string
 *                 description: Yangi foydalanuvchi ismi
 *                 example: "Vali Ahmadov"
 *               phoneNumber:
 *                 type: string
 *                 description: Yangi telefon raqami
 *                 example: "+998907654321"
 *               orderCount:
 *                 type: number
 *                 description: Yangi buyurtma soni
 *                 example: 10
 *               blocked:
 *                 type: boolean
 *                 description: Yangi bloklangan holati
 *                 example: true
 *             required:
 *               - fullName
 *               - phoneNumber
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Foydalanuvch ma`lumotlari yangilandi"
 *       404:
 *         description: Foydalanuvchi topilmadi
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
 *                   example: "Foydalanuvchi topilmadi"
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
userRouter.put("/update_user/:id",updateUser as RequestHandler)

/**
 * @swagger
 * /delete_user/{id}:
 *   delete:
 *     summary: Foydalanuvchini o‘chirish
 *     description: Ma'lum bir foydalanuvchini ID bo‘yicha o‘chiradi.
 *     tags: [Users]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *         description: Foydalanuvchi ID
 *     responses:
 *       200:
 *         description: Foydalanuvchi muvaffaqiyatli o‘chirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Foydalanuvchi ma`lumotlari o`chirildi"
 *       404:
 *         description: Foydalanuvchi topilmadi
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
 *                   example: "Foydalanuvchi topilmadi"
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
userRouter.delete("/delete_user/:id",deleteUser as RequestHandler)

export default userRouter