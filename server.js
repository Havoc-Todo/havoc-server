const Hapi = require('hapi')
const mongoose = require('mongoose')

const Task = require('./models/task')
const User = require('./models/user')

mongoose.connect('mongodb://master:havoc@ds057476.mlab.com:57476/havoc')

const server = new Hapi.Server()
server.connection({ port: 3000 })

server.route({
  method: 'GET',
  path: '/api/task/read/{user}/{task?}',
  handler(request, reply) {
    const params = request.params
    Task.find(params).exec()
      .then((docs) => reply(docs))
      .catch((err) => reply(err))
  }
})

server.route({
  method: 'POST',
  path: '/api/task/create',
  handler(request, reply) {
    console.log(request.body)

    const task = new Task(request.body.task)

    task.save()
      .then((doc) => reply({ status: true, task: doc }))
      .catch((err) => reply({ status: false, err }))
  }
})

server.route({
  method: 'POST',
  path: '/api/task/delete/{task}',
  handler(request, reply) {
    const taskId = request.params.task
    Task.remove({ t_id: taskId }).exec()
      .then((result) => console.log(result))
      .catch((err) => console.log(err))
    reply('ok')
  }
})

server.route({
  method: 'GET',
  path: '/api/user',
  handler(request, reply) {
    User.find({}).exec()
      .then((docs) => {
        if (docs) reply(docs)
        else reply({ status: 'ERROR' })
      })
  }
})

server.route({
  method: 'POST',
  path: '/api/user/create',
  handler(request, reply) {
    const user = new User(request.payload)
    user.save()
      .then((doc) => {
        if (doc) reply(doc)
        else reply({ status: 'ERROR' })
      })
  }
})

server.start((err) => {
  if (err) {
    throw err
  }
  console.log(`Server running at: ${server.info.uri}`)
})
