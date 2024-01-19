import { Project } from "../modals/Project.js"
import { Note } from "../modals/Note.js"
import { errorHandler } from "./error/errorHandler.js"

export const projectController = async (req, res, next) => {
    const { title, type, categories, introduction, imgUrl, notes, projectLink } = req.body
    const project = new Project({ title, type, categories, introduction, imgUrl, notes, projectLink })
    try {
        await project.save()
        res.status(201).json('project created')
    } catch (err) {
        next(err)
    }
}

export const projectsController = async (req, res, next) => {
    try {
        const projects = await Project.find({})
        let projectsMap = {};
        projects.forEach((project) => {
            projectsMap[project._id] = project
        })
        if ( req.params.index !== undefined ) {
            projectsMap = Object.keys(projectsMap).slice(0,3).reduce((value, key) => {
                value[key] = projectsMap[key]
                return value
            }, {})
        }
        res.status(200).json(projectsMap)
    } catch (err) {
        next(err)
    }
}

export const singleProjectController = async (req, res, next) => {
    try {
        const singleId = await Project.findById(req.params.id)
        if(!singleId) return errorHandler(404, 'project can not be found!')
        res.status(200).json(singleId)
    } catch(err) {
        next(err)
    }
}

export const deleteProjectController = async (req, res, next) => {
    const projectId = await Project.findById(req.params.id)
    try {
        if(!projectId) return errorHandler(404, 'project can not be found!')
        await Project.findByIdAndDelete(projectId)
    res.status(200).json('the project has been deleted')
} catch (err) {
    next(err)
}
}

export const updateProjectController = async (req, res, next) => {
    const projectId = await Project.findById(req.params.id)
    try {
        if(!projectId) return errorHandler(404, 'project can not be found!')
        const updatedProject = await Project.findByIdAndUpdate(req.params.id, req.body, { new: true })
        res.status(201).json(updatedProject)
    } catch (err) {
        next(err)
    }
}

export const noteController = async (req, res, next) => {
    const { title, type, categories, notes } = req.body
    const note = new Note({ title, type, categories, notes })
    try {
        await note.save()
        res.status(201).json('note created')
    } catch (err) {
        next(err)
    }
}

export const notesController = async (req, res, next) => {
    let type = req.query.type
    if( type === undefined) {
        type = {$in: ['frontend', 'backend', 'framework', 'mobile application', 'database', 'plugin', 'acoustic']}
    }
    let categories = req.query.categories
    if( categories === undefined) {
        categories = {$in: ['react', 'vue', 'express', 'javascript', 'tailwindcss', 'java', 'python', 'django', 'mongoDB', 'mongoose', 'mySQL']}
    }
    try {
        const notes = await Note.find({
            type,
            categories
        })
        let notesMap = {};
        notes.forEach((note) => {
            notesMap[note._id] = note
        })
        if ( req.params.index !== undefined ) {
            notesMap = Object.keys(notesMap).slice(0,req.params.index).reduce((value, key) => {
                value[key] = notesMap[key]
                return value
            }, {})
        }
        res.status(200).json(notesMap)
    } catch (err) {
        next(err)
    }
}

export const notesSearchController = async (req, res, next) => {
    console.log(req.query);
    try {
        const notes = await Note.find({})
        let notesMap = {};
        notes.forEach((note) => {
            notesMap[note._id] = note
        })
        if ( req.params.index !== undefined ) {
            notesMap = Object.keys(notesMap).slice(0,req.params.index).reduce((value, key) => {
                value[key] = notesMap[key]
                return value
            }, {})
        }
        res.status(200).json(notesMap)
    } catch (err) {
        next(err)
    }
}

