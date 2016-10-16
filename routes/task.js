const Task = require('../models/task')
const _ = require('lodash')
const Chance = require('chance')

const chance = new Chance()

module.exports = [
  {
    method: 'GET',
    path: '/api/task/read/{user}/{task?}',
    handler(request, reply) {
      const params = request.params
      Task.find(params).exec()
        .then((doc) => {
          if (doc) reply({ status: true, doc })
          else reply({ status: false })
        })
    }
  },
  {
    method: 'POST',
    path: '/api/task/create',
    handler(request, reply) {
      const temp = _.merge(request.payload, { t_id: chance.guid() })
      const task = new Task(temp)
      task.save()
        .then((doc) => reply({ status: true, doc }))
    }
  },
  {
    method: 'POST',
    path: '/api/task/delete/{task}',
    handler(request, reply) {
      const taskId = request.params.task
      Task.remove({ t_id: taskId }).exec()
        .then((result) => {
          if (result) reply({ status: true })
          else reply({ status: false })
        })
    }
  }
]
