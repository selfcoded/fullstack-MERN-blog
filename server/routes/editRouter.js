import express from 'express'
import { projectController, } from '../controllers/edit.js'

export const projectRouter = express.Router()

projectRouter.post('/edit/project', projectController)

export default { projectRouter, }