import Todo from '../models/Todo.js'

/**
 *
 * @returns {Promise<Object[]>} todos - all todos in the database
 */

export async function findAllTodos() {
  let todos = await Todo.find({})
  return todos
}
