import { createUserRole, deleteUserRole, getRoles } from "../Controllers/userRoleControllers.js";
import express from "express";
import { protect,admin } from "../Middleware/authMiddleware.js";
const router = express.Router()

router.post('/createRole',protect,admin,createUserRole)
router.delete('/:slug', protect,admin,deleteUserRole)
router.get('/roles', getRoles)

export default router