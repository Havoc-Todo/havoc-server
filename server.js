const Hapi = require('hapi')
const mongoose = require('mongoose')

const api = require('./routes/api')

mongoose.Promise = require('bluebird')
mongoose.connect('mongodb://master:havoc@ds057476.mlab.com:57476/havoc')

const server = new Hapi.Server()
server.connection({ port: 3000, routes: { cors: true } })

server.route(api)

server.start((err) => {
  if (err) {
    throw err
  }
  console.log(`Server running at: ${server.info.uri}`)
})

server.on('response', (request) => {
  const addr = request.info.remoteAddress
  const method = request.method.toUpperCase()
  const path = request.url.path
  const code = request.response.statusCode
  console.log(`${addr}: ${method} ${path} --> ${code}`)
})
