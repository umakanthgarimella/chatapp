'use strict'

const passport = require('passport')
const BasicStrategy = require('passport-http').BasicStrategy
require('module-alias/register')

const { User } = require('@database')

passport.use(new BasicStrategy(
  function (email, password, done) {
    User.findOne({ email: email }).exec((err, doc) => {
      if (err) return done(err)
      if (!doc) return done(null, false)
      if (doc.password !== password) return done(null, false)
      return done(null, doc)
    })
  }
))

module.exports = passport
