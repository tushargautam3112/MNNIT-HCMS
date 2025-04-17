import express from "express";
import { recordData,getRecords,updateStatus } from "../Controllers/workerFormControllers.js";
import { protect,admin } from "../Middleware/authMiddleware.js";
const router = express.Router()

router.post('/record',protect,recordData)
router.get('/getRecords',protect,admin,getRecords)
router.patch('/update',protect,admin,updateStatus)

export default router