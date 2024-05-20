import express from 'express'
import { CreateProject, DeleteProject, GetAllProject, GetMyProject, UpdateProject } from '../controller/ProjectController'
import { Authentication } from '../middleware/auth'

const router = express.Router()

router.post('/create', Authentication ,  CreateProject)
router.get('/getall', GetAllProject)
router.get('/myproject',Authentication, GetMyProject)
router.put('/update/:id',Authentication, UpdateProject)
router.delete('/delete/:id', Authentication , DeleteProject)

export default router