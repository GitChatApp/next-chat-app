const superagent = require('superagent')
require('dotenv').config()

const authorize = (code) => {
  return superagent.post('https://github.com/login/oauth/access_token')
    .send({
      code: code,
      client_id: process.env.CLIENT_ID,
      client_secret: process.env.CLIENT_SECRET,
      redirect_uri: process.env.REDIRECT_URI,
    })

    .then(res => {
      let token = res.body.access_token
      return token
    })

    .then(token => {
      return superagent.get(`https://api.github.com/user?access_token=${token}`)
        .then(res => {
          return res.body.login
        })
    })
}

module.exports = { authorize }
