import mongoose from 'mongoose'
const { Schema } = mongoose

/**
 * defines the todo Schema
 * @class  Todo
 * @property {String} content - Contains the todo content
 * @property {Object} meta - Contains the isActive meta
 *
 */
const todoSchema = new Schema(
  {
    content: {
      type: String,
      required: true,
    },
    meta: {
      isActive: Boolean,
    },
  },
  { strict: 'throw' },
)

export default mongoose.model('Todo', todoSchema)
