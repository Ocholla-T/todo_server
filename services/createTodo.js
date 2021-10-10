import Todo from '../models/Todo.js'

/**
 *  creates a new todo and saves it to the database
 * @param {Object} todo - the todo to be created
 * @param {String} todo.content - the todo's content
 * @param {boolean} todo.isActive - is the todo active or completed
 * @returns {Promise} todoID
 */

export async function createTodo({ content, isActive }) {
  try {
    const newTodo = new Todo({
      content,
      meta: {
        isActive,
      },
    })

    await newTodo.save()

    return { todoID: newTodo._id }
  } catch (error) {
    throw error
  }
}
