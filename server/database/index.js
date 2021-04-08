'use strict'

const nconf = require('nconf')
const mongoose = require('mongoose')

const Message = require('./schemas/message')
const User = require('./schemas/user')

exports.connect = () => {
  let uri = 'mongodb://'
  uri += nconf.get('MONGODB_USERNAME') + ':' + nconf.get('MONGODB_PASSWORD') + '@'
  uri += nconf.get('MONGODB_HOSTS') + '/' + nconf.get('MONGODB_DATABASE')

  const options = {
    dbName: nconf.get('MONGODB_DATABASE'),
    useNewUrlParser: true,
    useCreateIndex: true
  }

  mongoose.connect(uri, options)
  const db = mongoose.connection

  db.on('connected', () => {
    console.log('logName=dbConnected')
  })
  db.on('error', (err) => {
    console.error(err)
  })
}

exports.Message = Message
exports.User = User
