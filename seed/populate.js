const fetch = require('isomorphic-fetch')
const Chance = require('chance')

const chance = new Chance()

const guid = chance.guid()

fetch('http://localhost:3000/api/user/create',{
  method: 'POST',
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json'
  },
  body: {
    u_id: guid,
    email: 'test@test.com',
    password: '123'
  }
})
.then((res) => console.log(res))
.catch((err) => console.log(err))

