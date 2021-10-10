import Todo from '../models/Todo.js'

/**
 * deletes all todos
 * @returns {Promise<number>} deletedCount - this is the number of todos deleted
 */

export async function deleteAllTodos() {
  return await Todo.deleteMany({})
    .then((response) => response.deletedCount)
    .catch((error) => {
      throw error
    })
}
