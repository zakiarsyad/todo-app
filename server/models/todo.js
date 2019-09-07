
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const todoSchema = new Schema({
    name: {
        type: String,
        required: [true, `name is requires`]
    },
    description: {
        type: String,
        required: [true, `description is requires`]
    },
    due_date: {
        type: Date,
        required: [true, `due date is requires`]
    },
    status: {
        type: String,
        default: "uncomplete"
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User'
    }
}, { timestamps: { createdAt: 'created_at' } })

module.exports = mongoose.model('Todo', todoSchema)