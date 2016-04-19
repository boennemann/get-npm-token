var log = require('npmlog')
var RegistryClient = require('npm-registry-client')
var url = require('url')

var client = new RegistryClient({log: log})

log.level = 'error'

module.exports = function getToken (registry, username, password, callback) {
  // Manual request to avoid account creation.
  // This should be supported by npm-registry-client: https://github.com/npm/npm-registry-client/issues/135

  var userobj = {
    _id: 'org.couchdb.user:' + username,
    name: username,
    password: password,
    type: 'user',
    roles: [],
    date: new Date().toISOString()
  }

  var uri = url.resolve(registry, '-/user/org.couchdb.user:' + encodeURIComponent(username))
  var options = {
    method: 'PUT',
    body: userobj
  }
  client.request(uri, options, function (error, data, json, response) {
    if (error) {
      if (error.statusCode === 401) error.message = 'Your password seems to be wrong.'
      if (error.statusCode === 400) error.message = 'You probably mistyped your username'
      return callback(error)
    }
    if (!data.token) return callback(new Error('No token returned.'))

    callback(null, data.token)
  })
}
