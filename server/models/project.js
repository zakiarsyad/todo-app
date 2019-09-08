
const mongoose = require('mongoose')
const Schema = mongoose.Schema

const projectSchema = new Schema({
    name: {
        type: String,
        required: [true, `name is requires`]
    },
    todoId: [{
        type: Schema.Types.ObjectId,
        ref: 'Todo'
    }],
    userId: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }]
}, { timestamps: { createdAt: 'created_at' } })

module.exports = mongoose.model('Project', projectSchema)