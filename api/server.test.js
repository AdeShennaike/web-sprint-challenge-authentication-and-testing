// Write your tests here
const server = require('./server')
const request = require('supertest')
const Users = require('./users/user-model')
const db = require('../data/dbConfig')

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db.seed.run()
})
afterAll(async () => {
  await db.destroy()
})

test('sanity', () => {
  expect(true).not.toBe(false)
})

describe('[POST] /api/auth/register', () => {
  test('', () => {

  })
}

describe('[POST] /api/auth/login', () => {

}
describe('[GET] /api/jokes', () => {

}
