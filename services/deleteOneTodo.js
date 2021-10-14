import Todo from '../models/Todo.js'

/**
 *
 * @param {Object} todo
 * @param {String} todo._id
 * @returns {Promise<number>}
 */

export async function deleteOneTodo({ _id }) {
  if (_id.match(/^[0-9a-fA-F]{24}$/)) {
    return await Todo.deleteOne({ _id }).then((response) => response.deletedCount)
  } else throw new Error('The _id is not a valid ObjectId')
}
