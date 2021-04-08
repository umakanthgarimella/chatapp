'use strict'

const mongoose = require('mongoose')
const { Schema } = mongoose

const MessageSchema = new Schema({
  _userId: { type: Schema.Types.ObjectId, required: true },

  time: { type: Schema.Types.Number, required: true },
  message: { type: Schema.Types.String, required: true }

})

MessageSchema.statics.generateDoc = (user, reqBody, dbDoc) => {
  const doc = {}
  doc._userId = user._id
  doc.time = Date.now()
  doc.message = reqBody.message

  return doc
}

MessageSchema.statics.generateResponse = (doc) => {
  const toReturn = {}
  if (doc.toObject) doc = doc.toObject()

  toReturn.time = doc.time
  toReturn.message = doc.message

  return toReturn
}

const model = mongoose.model('Message', MessageSchema)
module.exports = model
