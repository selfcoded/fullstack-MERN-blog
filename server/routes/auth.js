import express from 'express'
import { authAdmin, authAdminLogin } from '../controllers/auth.js'

const router = express.Router()

router.post('/auth/admin', authAdmin)
router.post('/auth/admin/login', authAdminLogin)

export default router

