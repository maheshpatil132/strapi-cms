import express from 'express'
import UserRouter from './user'
import ProjectRouter from './project'
import AttributeRouter from './attribute'
import EntityRouter from './entity'
import ValueRouter from './value'

const router = express.Router()

router.use('/user', UserRouter)
router.use('/project', ProjectRouter)
router.use('/attribute', AttributeRouter)
router.use('/entity', EntityRouter)
router.use('/value', ValueRouter)

export default router