import express from 'express'
import { projectController, 
        projectsController, 
        singleProjectController, 
        deleteProjectController, 
        updateProjectController,
        noteController,
        notesController,
        notesSearchController
     } from '../controllers/edit.js'
import verifyToken from './verify.js'

export const projectRouter = express.Router()
export const noteRouter = express.Router()

projectRouter.post('/edit/project', verifyToken, projectController)
projectRouter.get('/projects/:index?', projectsController)
projectRouter.get('/projects/:id', singleProjectController)
projectRouter.get('/projects/delete/:id', deleteProjectController)
projectRouter.post('/update/project/:id', updateProjectController)

noteRouter.post('/edit/note', verifyToken, noteController)
noteRouter.get('/notes/:index?', notesController)

export default { projectRouter, noteRouter}