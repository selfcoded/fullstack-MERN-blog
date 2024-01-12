import {Project} from "../modals/Project.js"

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