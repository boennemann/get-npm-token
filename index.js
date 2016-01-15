var log = require('npmlog')
var RegistryClient = require('npm-registry-client')

var client = new RegistryClient({log: log})

log.level = 'error'

module.exports = function (registry, username, email, password, callback) {
  client.adduser(registry, {
    auth: {
      username: username,
      email: email,
      password: password
    }
  }, function (err, data) {
    if (err) return callback(err)

    if (!data.token) return callback(new Error('No token returned'))

    callback(null, data.token)
  })
}
