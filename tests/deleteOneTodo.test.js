// @ts-nocheck
import db from './database.js'
import Todo from '../models/Todo.js'
import { deleteOneTodo } from '../services/deleteOneTodo.js'
import { createTodo } from '../services/createTodo.js'

beforeAll(async () => await db.connect())
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())

test('should delete one todo', async () => {
  let todoOneID = (await createTodo({ content: 'test todo 1', isActive: true })).toString()

  expect(await Todo.findById(todoOneID)).toBeTruthy()
  await deleteOneTodo({ _id: todoOneID })
  expect(await Todo.findById(todoOneID)).toBeFalsy()
})

test(`should throw error if id doesn't match ObjectId format`, async () => {
  let todoID = '6165d512025ffd55991e122'

  try {
    await deleteOneTodo({ _id: todoID })
  } catch (error) {
    expect(error.message).toEqual('The _id is not a valid ObjectId')
  }
})
