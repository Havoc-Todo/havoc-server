const _ = require('lodash')
const mongoose = require('mongoose')

const taskSchema = new mongoose.Schema({
  t_id: String,
  name: String,
  description: String,
  subtasks: Array,
  category: String,
  indexInList: Number,
  priority: String,
  dateDue: Number,
  allDay: Boolean,
  user: String,
  attribute: Object,
  status: String
})

const required = ['t_id', 'name', 'dateDue', 'user']

_.forEach(required, (val) => { val.required = true }) // eslint-disable-line no-param-reassign

// subtasks : [{ name: string, isCompleted: bool }]

const task = mongoose.model('task', taskSchema)

module.exports = task
