const Task = require('../models/task')
const _ = require('lodash')
const Chance = require('chance')
const Map = require('immutable').Map

const chance = new Chance()

module.exports = [
  {
    method: 'GET',
    path: '/api/task/read/{user}/{task?}',
    handler(request, reply) {
      const req = new Map(request)
      const params = req.get('params')
      Task.find(params).exec()
        .then((doc) => {
          if (doc) reply({ status: true, doc })
          else reply({ status: false })
        })
    }
  },
  {
    method: 'POST',
    path: '/api/task/create/',
    handler(request, reply) {
      const temp = _.merge(request.payload, { t_id: chance.guid() })
      console.log(temp)
      const task = new Task(temp)
      task.save()
        .then((doc) => reply({ status: true, doc }))
        .catch((err) => {
          console.log(err)
          reply({ status: false, err }).code(400)
        })
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
  },
  {
    method: 'POST',
    path: '/api/task/update/',
    handler(request, reply) {
      Task.update(
        { t_id: request.payload.t_id },
        { $set: request.payload },
        (err, task) => {
          if (err) reply({ status: false, err })
          else if (task) reply({ status: true, task })
        }
      )
    }
  }
]
