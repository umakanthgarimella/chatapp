'use strict'

const util = require('util')

const { User } = require('@database')

const createUser = async (userObj) => {
  try {
    const doc = await new User(User.generateDoc(userObj)).save()
    console.log(`logName=userCreation, status=success, _id=${doc._id}`)
    return doc
  } catch (e) {
    console.log(`logName=userCreation, status=failed, err=${util.inspect(e, { depth: 4 })}`)
    throw e
  }
}

exports.createUser = createUser
