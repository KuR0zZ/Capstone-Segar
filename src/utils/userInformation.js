const jwt = require('jsonwebtoken')

const userInfo = (auth) => {
  const token = auth.split(' ')[1]
  const decoded = jwt.verify(token, process.env.JWT_SECRET)
  return decoded
}

module.exports = userInfo