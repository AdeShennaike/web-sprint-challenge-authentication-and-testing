// Write your tests here
const server = require('./server')
const request = require('supertest')
const db = require('../data/dbConfig')

let user1 = {
  username: 'albert',
  password: '129458'
}
let user2 = {
  username: 'sade',
  password: '384749'
}

beforeAll(async () => {
  await db.migrate.rollback()
  await db.migrate.latest()
})
beforeEach(async () => {
  await db("users").truncate()
})
afterAll(async () => {
  await db.destroy()
})

test('sanity', () => {
  expect(true).not.toBe(false)
})

describe('[POST] /api/auth/register', () => {
  test('Creates new user', async () => {
    let res = await request(server).post('/api/auth/register').send(user1)
    let response = await request(server).post('/api/auth/register').send(user2)
    expect(res.body).toMatchObject({username: 'albert'})
    expect(response.body.id).toBe(2)
    expect(response.body.username).toBe('sade')
  })

  test('Displays name in use if name already exist', async () => {
    await request(server).post('/api/auth/register').send(user2)
    const res = await request(server).post('/api/auth/register').send(user2)
    expect(res.status).toBe(422)
    expect(res.body.message).toBe('Username taken')
  })
})

// describe('[POST] /api/auth/login', () => {
//   test('Creates new user', async () => {
//     await request(server).post('/api/auth/login').send(user1)
//     let res = await db('users').where('username', 'albert').first()
//     expect(res).toMatchObject({username: 'albert'})
//   })

//   test('Creates new user', async () => {
//     await request(server).post('/api/auth/login').send(user1)
//     let res = await db('users').where('username', 'albert').first()
//     expect(res).toMatchObject({username: 'albert'})
//   })
// })
