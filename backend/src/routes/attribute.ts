import express from 'express'
import { CreateAtribute, DeleteAttribute, GetAllAttributes, GetAttribute, UpdateAttribute } from '../controller/AttributeController'
import { Authentication } from '../middleware/auth'

const router = express.Router()

router.post('/:id/create', Authentication ,  CreateAtribute)
router.get('/:id/getall',Authentication , GetAllAttributes)
router.get('/:id',Authentication , GetAttribute)
router.put('/update/:entity/attribute/:id',Authentication , UpdateAttribute)
router.delete('/delete/:id',Authentication , DeleteAttribute)

export default router