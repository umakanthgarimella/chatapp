'use strict'

const util = require('util')

const { Message } = require('@database')

const createMessage = async (user, messageObj) => {
  try {
    const doc = await new Message(Message.generateDoc(user, messageObj)).save()
    console.log(`logName=messageCreation, status=success, _id=${doc._id}`)
    return doc
  } catch (e) {
    console.log(`logName=messageCreation, status=failed, err=${util.inspect(e, { depth: 4 })}`)
    throw e
  }
}

exports.createMessage = createMessage
