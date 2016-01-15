#!/usr/bin/env node

var ary = require('lodash.ary')
var bind = require('lodash.bind')
var npmconf = require('npmconf')
var inquirer = require('inquirer')
var validator = require('validator')

var _ = bind.placeholder = {}

try {
  var keytar = require('keytar')
} catch (e) {
  keytar = null
}

var force = process.argv[2] === '--force' || process.argv[2] === '-f'
var getToken = require('./')

npmconf.load(function (err, conf) {
  if (err) {
    console.error('Failed to load npm config.', err)
    process.exit(1)
  }

  var password

  inquirer.prompt([{
    type: 'input',
    name: 'registry',
    message: 'npm registry',
    default: conf.get('registry'),
    validate: bind(validator.isURL, null, _, {
      protocols: [ 'http', 'https' ],
      require_protocol: true
    })
  }, {
    type: 'input',
    name: 'username',
    message: 'npm username',
    default: conf.get('username'),
    validate: ary(bind(validator.isLength, null, _, 1), 1)
  }, {
    type: 'input',
    name: 'email',
    message: 'npm email',
    default: conf.get('email'),
    validate: validator.isEmail
  }, {
    type: 'password',
    name: 'password',
    message: 'npm password',
    validate: ary(bind(validator.isLength, null, _, 1), 1),
    when: function (answers) {
      password = keytar && answers.username && !force
        ? keytar.getPassword('npm-get-token', answers.username)
        : null

      return !password
    }
  }], function (answers) {
    getToken(answers.registry, answers.username, answers.email, answers.password || password, function (err, token) {
      if (err) {
        console.error(err)
        process.exit(1)
      }

      console.log(token)
      if (keytar && !password && answers.password) keytar.addPassword('npm-get-token', answers.username, answers.password)
      conf.set('username', answers.username, 'user')
      conf.set('email', answers.email, 'user')
      conf.save('user')
    })
  })
})
