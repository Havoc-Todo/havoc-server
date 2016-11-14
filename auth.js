const request = require('superagent-es6-promise')

const checkToken = (token) => (
  new Promise((resolve, reject) => {
    const requestString = 'https://www.googleapis.com/oauth2/v3/tokeninfo?id_token=' + token
    request.get(requestString)
      .then(() => resolve())
      .catch(() => reject())
  })
)

const validate = (token = null) => (
  new Promise((resolve, reject) => {
    if (!token) {
      reject(new Error('You are not an authenticated user. Please log in'))
    }
    checkToken(token)
      .then(() => resolve())
      .catch((err) => reject(err))
  })
)

module.exports = validate
