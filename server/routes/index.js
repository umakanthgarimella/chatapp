'use strict'

const express = require('express')
const router = express.Router()

require('module-alias/register')

const passport = require('@passports/api')
const apiProcessors = require('@processors/apiProcessors')
const messageProcessors = require('@processors/messageProcessors')
const { User, Message } = require('@database')

const getRouter = () => {
  router.post('/messages',
    passport.authenticate('basic', { session: false }),
    (req, res, next) => {
      const messageObj = {
        message: req.body.message
      }
      messageProcessors.createMessage(req.user, messageObj).then((doc) => {
        return res.status(201).json(Message.generateResponse(doc))
      }).catch((err) => {
        return res.status(422).json({ errors: [err] })
      })
    })

  router.post('/users',
    (req, res, next) => {
      const userObj = {
        email: req.body.email,
        password: req.body.password
      }
      apiProcessors.createUser(userObj).then((doc) => {
        return res.status(201).json(User.generateResponse(doc))
      }).catch((err) => {
        return res.status(422).json({ errors: [err] })
      })
    })

  return router
}

exports.getRouter = getRouter
