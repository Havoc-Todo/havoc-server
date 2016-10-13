const Hapi = require('hapi')
const Task = require('./models/task')
const mongoose = require('mongoose')

mongoose.connect('mongodb://localhost/test')

const server = new Hapi.Server()
server.connection({ port: 3000 })

server.route({
  method: 'GET',
  path: '/api/task/read/{user}{task?}',
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

server.start((err) => {
  if (err) {
    throw err
  }
  console.log(`Server running at: ${server.info.uri}`)
})
