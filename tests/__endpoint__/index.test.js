// @ts-nocheck
import app from '../../server.js'
import db from '../database.js'
import supertest from 'supertest'
import { createTodo } from '../../services/createTodo.js'
import { deleteOneTodo } from '../../services/deleteOneTodo.js'

beforeAll(async () => await db.connect())
afterEach(async () => await db.clearDatabase())
afterAll(async () => await db.closeDatabase())

const request = supertest(app)

describe('GET /api/todo', () => {
  test('Should get all todos from the database and return status 200', (done) => {
    request
      .get('/api/todo')
      .set('Accept', 'application/json')
      .expect('Content-type', /json/)
      .expect(200, done)
  })
})

describe('POST /api/todo', () => {
  test('Should post todo to the database and return status 201 ', (done) => {
    const todo = {
      content: 'test todo',
      isActive: true,
    }

    request
      .post('/api/todo')
      .send(todo)
      .expect('Content-type', /json/)
      .expect(201)
      .end((err) => {
        if (err) return done(err)
        done()
      })
  })

  test('Should return 400 error for invalid input in either content or isActive fields or both', async () => {
    const todo = {
      content: 0,
      isActive: 'tru',
    }

    const response = await request.post('/api/todo').send(todo)

    expect(response.statusCode).toEqual(400)
  })
})

describe('PATCH /api/todo/:id', () => {
  test('Should find todo and return status 200 if found and updated', async () => {
    const todoID = await createTodo({ content: 'test todo', isActive: true })
    let todo = {
      content: 'update test todo',
      isActive: false,
    }

    const response = await request.patch(`/api/todo/${todoID}`).send(todo)

    expect(response.statusCode).toBe(200)
  })

  // test('Should return status 404 if no todo is found', async () => {
  //   const todoID = (await createTodo({ content: 'test todo', isActive: true })).toString()
  //   let todo = {
  //     content: 'update test todo',
  //     isActive: false,
  //   }

  //   await deleteOneTodo({ _id: todoID })

  //   await request.patch(`/api/todo/${todoID}`)

  //   // expect(response.statusCode).toBe(404)
  })
})
