import express from 'express'
import { CreateUser, DeleteUser, GetAllUser, UpdateUser } from '../controller/UserController'
import { Authentication } from '../middleware/auth'

const router = express.Router()

router.post('/create', CreateUser)
router.get('/getall', GetAllUser)
router.put('/update', Authentication , UpdateUser)
router.delete('/delete/:id',Authentication , DeleteUser)

export default router