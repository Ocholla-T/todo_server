import Todo from '../models/Todo.js'

/**
 * @param {Object} todo
 * @param {String} todo._id
 * @param {String} todo.content
 * @param {boolean} todo.isActive
 * @returns {Promise<Object>} updated todo
 */
export async function updateTodo({ _id, content, isActive }) {
  /**
   * @type {Object} - options passed to findByIDAndUpdate method
   * @property {boolean} options.new - ensures the new todo is returned
   * @property {boolean} options.runValidators - run validations from Todo Schema
   */

  const options = {
    new: true,
    runValidators: true,
  }

  /**
   * check if _id passed is a valid ObjectId as expected by mongoose
   */

  if (_id.match(/^[0-9a-fA-F]{24}$/)) {
    return await Todo.findByIdAndUpdate(
      _id,
      { content: content, meta: { isActive: isActive } },
      options,
    )
  } else throw new Error('The _id is not a valid ObjectId')
}
