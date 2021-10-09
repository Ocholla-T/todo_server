// @ts-nocheck
import { MongoMemoryServer } from 'mongodb-memory-server'
import { createTodo } from '../services/createTodo.js'
import Todo from '../models/Todo.js'
import db from './database.js'

beforeAll(async () => await db.connect())
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())

describe('Create a todo when: ', () => {
  test('new todo', async () => {
    const { todoID } = await createTodo('test todo', false)
    const todo = await Todo.findById(todoID)

    expect(todo.content).toBe('test todo')
    expect(typeof todo.meta.isActive === 'boolean').toBeTruthy()
  })
  test('invalid input', async () => {
    await expect(createTodo('first todo', 'im invalid')).rejects.toThrow()
    await expect(createTodo('first todo', -1)).rejects.toThrow()
    await expect(createTodo('first todo', {})).rejects.toThrow()
  })
})
