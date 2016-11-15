const task = require('./task')
const user = require('./user')
const auth = require('./auth')

module.exports = [].concat(task, user, auth)
