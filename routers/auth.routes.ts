import { RequestHandler, Router } from "express";
import { validateAdmin } from "../middleware/auth.middleware";
import { createAdmin, deleteAdmin, getAllAdmins, getOneAdmin, login, logout, updateAdmin } from "../controller/auth.ctr";
import { chekAdmin, chekSuperadmin } from "../middleware/chekAdmin";
const authRouter = Router()

/**
 * @swagger
 * /login:
 *   post:
 *     summary: Foydalanuvchi tizimga kirish
 *     description: Foydalanuvchi login va parol orqali tizimga kiradi. Muvaffaqiyatli kirishda access va refresh tokenlar cookie sifatida qaytariladi.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - password
 *             properties:
 *               login:
 *                 type: string
 *                 description: Foydalanuvchi logini
 *                 example: "admin"
 *               password:
 *                 type: string
 *                 description: Foydalanuvchi paroli
 *                 example: "password123"
 *     responses:
 *       200:
 *         description: Tizimga muvaffaqiyatli kirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tizimga muvaffaqiyatli kirdingiz"
 *                 found:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: Foydalanuvchi ID
 *                     login:
 *                       type: string
 *                       description: Foydalanuvchi logini
 *                     role:
 *                       type: string
 *                       description: Foydalanuvchi roli
 *                 access:
 *                   type: string
 *                   description: Access token
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: accessToken=eyJhbGciOiJIUzI1NiIs...; HttpOnly; Max-Age=1800000; refreshToken=eyJhbGciOiJIUzI1NiIs...; HttpOnly; Max-Age=604800000
 *       400:
 *         description: Login yoki parol kiritilmagan
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
 *                   example: "Login va parol yuborilishi kerak!"
 *       401:
 *         description: Foydalanuvchi topilmadi yoki login/parol xato
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 status:
 *                   type: number
 *                   example: 401
 *                 message:
 *                   type: string
 *                   example: "Foydalanuvchi topilmadi" # yoki "Login yoki parol xato!"
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
authRouter.post("/login",login as RequestHandler)

/**
 * @swagger
 * /logout:
 *   post:
 *     summary: Foydalanuvchi tizimdan chiqish
 *     description: Foydalanuvchi login orqali tizimdan chiqadi, access va refresh tokenlar cookie'dan o'chiriladi.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *             properties:
 *               login:
 *                 type: string
 *                 description: Foydalanuvchi logini
 *                 example: "admin"
 *     responses:
 *       200:
 *         description: Tizimdan muvaffaqiyatli chiqildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Tizimdan muvaffaqiyatli chiqdingiz!"
 *         headers:
 *           Set-Cookie:
 *             schema:
 *               type: string
 *               example: accessToken=; HttpOnly; Max-Age=0; refreshToken=; HttpOnly; Max-Age=0
 *       400:
 *         description: Login kiritilmagan
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
 *                   example: "Login kerak!"
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
 *                   example: "Foydalanuvchi topilmadi!"
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
authRouter.post("/logout",logout as RequestHandler)

/**
 * @swagger
 * /admins:
 *   get:
 *     summary: Barcha adminlarni olish
 *     description: Tizimdagi barcha adminlar ro‘yxatini qaytaradi.
 *     tags: [Auth]
 *     responses:
 *       200:
 *         description: Adminlar ro‘yxati muvaffaqiyatli qaytarildi
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 type: object
 *                 properties:
 *                   id:
 *                     type: number
 *                     description: Admin ID
 *                     example: 1
 *                   login:
 *                     type: string
 *                     description: Admin logini
 *                     example: "admin1"
 *                   role:
 *                     type: string
 *                     description: Admin roli
 *                     example: "superadmin"
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
authRouter.get("/get_admins",getAllAdmins as RequestHandler)

/**
 * @swagger
 * /admins/{id}:
 *   get:
 *     summary: Bitta adminni olish
 *     description: Berilgan ID orqali tizimdagi ma'lum bir admin haqida ma'lumot qaytaradi.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Adminning ID si
 *         example: 1
 *     responses:
 *       200:
 *         description: Admin muvaffaqiyatli topildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 id:
 *                   type: number
 *                   description: Admin ID
 *                   example: 1
 *                 login:
 *                   type: string
 *                   description: Admin logini
 *                   example: "admin1"
 *                 role:
 *                   type: string
 *                   description: Admin roli
 *                   example: "superadmin"
 *       404:
 *         description: Admin topilmadi
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
 *                   example: "Admin topilmadi"
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
authRouter.get("/get_one_admin/:id",getOneAdmin as RequestHandler)

/**
 * @swagger
 * /admins:
 *   post:
 *     summary: Yangi admin qo‘shish
 *     description: Yangi admin yaratadi, login va parolni qabul qiladi, parol hashlanadi va admin ro‘yxatga qo‘shiladi.
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - login
 *               - password
 *             properties:
 *               login:
 *                 type: string
 *                 description: Admin uchun login
 *                 example: "admin2"
 *               password:
 *                 type: string
 *                 description: Admin uchun parol
 *                 example: "password123"
 *     responses:
 *       201:
 *         description: Admin muvaffaqiyatli qo‘shildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Admin qo‘shildi"
 *                 newAdmin:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: Yangi adminning ID si
 *                       example: 2
 *                     login:
 *                       type: string
 *                       description: Admin logini
 *                       example: "admin2"
 *                     role:
 *                       type: string
 *                       description: Admin roli
 *                       example: "admin"
 *       400:
 *         description: Login yoki parol kiritilmagan yoki login allaqachon mavjud
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
 *                   example: "Login va parol yuborilishi kerak!" # yoki "Login bazada mavjud"
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
authRouter.post("/create_admin",validateAdmin,createAdmin as RequestHandler)

/**
 * @swagger
 * /admins/{id}:
 *   put:
 *     summary: Admin ma'lumotlarini yangilash
 *     description: Berilgan ID orqali adminning login yoki parolini yangilaydi. Parol hashlanadi.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: Yangilanadigan adminning ID si
 *         example: 1
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               login:
 *                 type: string
 *                 description: Yangi admin logini (ixtiyoriy)
 *                 example: "newadmin"
 *               password:
 *                 type: string
 *                 description: Yangi parol (ixtiyoriy)
 *                 example: "newpassword123"
 *     responses:
 *       200:
 *         description: Admin ma'lumotlari muvaffaqiyatli yangilandi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Admin ma'lumotlari yangilandi"
 *                 admin:
 *                   type: object
 *                   properties:
 *                     id:
 *                       type: number
 *                       description: Admin ID
 *                       example: 1
 *                     login:
 *                       type: string
 *                       description: Admin logini
 *                       example: "newadmin"
 *                     role:
 *                       type: string
 *                       description: Admin roli
 *                       example: "admin"
 *       400:
 *         description: Hech qanday ma'lumot kiritilmagan
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
 *                   example: "Hech qanday ma'lumot kiritilmadi"
 *       404:
 *         description: Admin topilmadi
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
 *                   example: "Admin topilmadi"
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
authRouter.put("/update_admin/:id",chekSuperadmin as RequestHandler, updateAdmin as RequestHandler)

/**
 * @swagger
 * /admins/{id}:
 *   delete:
 *     summary: Adminni o‘chirish
 *     description: Berilgan ID orqali adminni tizimdan o‘chiradi.
 *     tags: [Auth]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: integer
 *         description: O‘chiriladigan adminning ID si
 *         example: 1
 *     responses:
 *       200:
 *         description: Admin muvaffaqiyatli o‘chirildi
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 message:
 *                   type: string
 *                   example: "Admin muvoffaqiyatli o‘chirildi"
 *       404:
 *         description: Admin topilmadi
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
 *                   example: "Admin topilmadi"
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
authRouter.delete("/delete_admin/:id",chekSuperadmin as RequestHandler,deleteAdmin as RequestHandler)

export default authRouter