// @ts-nocheck
import { createTodo } from '../services/createTodo.js'
import Todo from '../models/Todo.js'
import db from './database.js'

beforeAll(async () => await db.connect())
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())

describe('Creating a todo: ', () => {
  /**
   * test if todo is created
   */
  test('should create a new todo', async () => {
    const { todoID } = await createTodo({ content: 'test todo', isActive: false })
    const todo = await Todo.findById(todoID)

    expect(todo.content).toBe('test todo')
    expect(typeof todo.meta.isActive === 'boolean').toBeTruthy()
  })
  /**
   * test for invalid inputs(types)
   */
  test('invalid input', async () => {
    await expect(createTodo({ content: 'first todo', isActive: 'im invalid' })).rejects.toThrow()
    await expect(createTodo({ content: true, isActive: -1 })).rejects.toThrow()
    await expect(createTodo({ content: 'first todo', isActive: {} })).rejects.toThrow()
  })
})
