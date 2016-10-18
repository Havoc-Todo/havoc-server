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
  user: String,
  attribute: Object,
  status: String
})

// subtasks : [{ name: string, isCompleted: bool }]

const task = mongoose.model('task', taskSchema)

module.exports = task
