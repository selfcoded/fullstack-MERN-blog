import mongoose from 'mongoose'

const ProjectSchema = mongoose.Schema({
    title: {type: String, required: true, maxLength: 30},
    type: {type: Array, required: true},
    categories: {type: Array, required: true},
    introduction: {type: String, required: true},
    imgUrl: {type: String, required: true},
    notes: {type: String, required: true},
    projectLink: {type: String, required: true}
}, {timestamps: true})

export const Project = mongoose.model('project', ProjectSchema)
