import express from 'express'
import { CreateProject, DeleteProject, GetAllProject, UpdateProject } from '../controller/ProjectController'
import { CreateEntity, DeleteEntity, GetAllEntities, GetEntity, UpdateEntity } from '../controller/EntityController'
import { Authentication } from '../middleware/auth'

const router = express.Router()

router.post('/:id/create', Authentication ,  CreateEntity)
router.get('/:id/getall',Authentication , GetAllEntities)
router.get('/get/:id',Authentication, GetEntity)
router.put('/update/:id',Authentication , UpdateEntity)
router.delete('/delete/:id',Authentication , DeleteEntity)

export default router