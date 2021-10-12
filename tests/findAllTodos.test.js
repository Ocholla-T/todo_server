// @ts-nocheck
import db from './database.js'
import { createTodo } from '../services/createTodo.js'
import { findAllTodos } from '../services/findAllTodos.js'

beforeAll(() => db.connect())
afterEach(() => db.clearDatabase())
afterAll(() => db.closeDatabase())

describe('Should find all todos in database', () => {
  test('finds all todos in database and returns them', async () => {
    await createTodo({ content: 'first test todo', isActive: true })
    await createTodo({ content: 'second test todo', isActive: false })

    let numberOfTodos = (await findAllTodos()).length
    expect(numberOfTodos).toBe(2)
  })
})
