import { createComplaint, deleteComplaint, getForAdmin, getForResident, updateAdmin, updateWorker, getForWorker } from "../Controllers/complaintControllers.js";
import express from "express";
import { protect, admin } from '../Middleware/authMiddleware.js'
const router = express.Router()

router.post('/create', protect, createComplaint)
router.patch('/delete/:id', protect, deleteComplaint)
router.get('/resident/get', protect, getForResident)
router.get('/admin/get', protect, admin, getForAdmin)
router.get('/worker/get', protect, getForWorker)
router.patch('/admin/update', protect, admin, updateAdmin)
router.patch('/worker/update', protect, updateWorker)


export default router