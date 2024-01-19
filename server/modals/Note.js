import mongoose from 'mongoose'

const NoteSchema = mongoose.Schema({
    title: {type: String, required: true, maxLength: 30},
    type: {type: Array, required: true},
    categories: {type: Array, required: true},
    notes: {type: String, required: true},
}, {timestamps: true})

export const Note = mongoose.model('note', NoteSchema)
