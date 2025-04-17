import express from 'express'
import {protect,admin} from '../Middleware/authMiddleware.js'
import {createAnnouncement,getAll,updateAnnouncement,deleteAnnouncement} from '../Controllers/announcementControllers.js'
const router = express.Router()

router.post('/create',protect,admin,createAnnouncement)
router.get('/getAll',protect,getAll)
router.patch('/update',protect,admin,updateAnnouncement)
router.delete('/:id',protect,admin,deleteAnnouncement)
export default router