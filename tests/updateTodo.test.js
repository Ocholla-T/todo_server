//@ts-nocheck
import db from './database.js'
import { createTodo } from '../services/createTodo.js'
import { updateTodo } from '../services/updateTodo.js'

beforeAll(() => db.connect())
afterEach(() => db.clearDatabase())
afterAll(() => db.closeDatabase())

describe('Does the document update if todo with _id is found', () => {
  test('updates the document', async () => {
    let todoID = (await createTodo({ content: 'this is a test todo', isActive: true })).toString()

    let updatedTodo = await updateTodo({
      _id: todoID,
      content: 'the todo is updated',
      isActive: true,
    })

    expect(updatedTodo.content).toEqual('the todo is updated')
  })

  test('does not update if id does not match expected length or character set', async () => {
    let todoID = '6ede6a0ba62570afcedd3a'

    try {
      await updateTodo({
        _id: todoID,
        content: 'the todo is updated',
        isActive: true,
      })
    } catch (error) {
      expect(error.message).toEqual('The _id is not a valid ObjectId')
    }
  })
})
