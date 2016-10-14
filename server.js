const Hapi = require('hapi')
const mongoose = require('mongoose')

const api = require('./routes/api')

mongoose.connect('mongodb://master:havoc@ds057476.mlab.com:57476/havoc')

const server = new Hapi.Server()
server.connection({ port: 3000 })

server.route(api)

server.start((err) => {
  if (err) {
    throw err
  }
  console.log(`Server running at: ${server.info.uri}`)
})
