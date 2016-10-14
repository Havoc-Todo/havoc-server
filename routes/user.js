const User = require('../models/user')

module.exports = [
  {
    method: 'GET',
    path: '/api/user',
    handler(request, reply) {
      User.find({}).exec()
        .then((doc) => {
          if (doc) reply({ status: true, doc })
          else reply({ status: false })
        })
    }
  },
  {
    method: 'POST',
    path: '/api/user/create',
    handler(request, reply) {
      const user = new User(request.payload)
      user.save()
        .then((doc) => {
          if (doc) reply({ status: true, doc })
          else reply({ status: false })
        })
    }
  }
]
