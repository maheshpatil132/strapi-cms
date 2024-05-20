import express from 'express'
import { CreateEntity, DeleteEntity, GetAllEntities, GetEntity, UpdateEntity } from '../controller/EntityController'
import { DeleteValue, GetAllValues, GetSingleValue, InsertValue, UpdateValue } from '../controller/ValueController'
import { Authentication } from '../middleware/auth'

const router = express.Router()

router.post('/:id/insert',Authentication, InsertValue)
router.get('/getall/:id',Authentication , GetAllValues)
router.get('/:id',Authentication , GetSingleValue)
router.put('/update/:id',Authentication , UpdateValue)
router.delete('/delete/:id',Authentication , DeleteValue)

export default router