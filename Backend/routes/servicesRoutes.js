import express from "express"
import { createService, deleteService, getServices } from "../Controllers/serviceControllers.js"
import { protect,admin } from "../Middleware/authMiddleware.js"
const router = express.Router()

router.post('/create',protect,admin,createService)
router.delete('/:slug',protect,admin,deleteService)
router.get('/getAll',protect,getServices)

export default router