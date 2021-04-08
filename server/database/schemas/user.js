'use strict'

const mongoose = require('mongoose')
require('module-alias/register')

const { encrypt, decrypt } = require('@util/encrypt')
const { Schema } = mongoose

const _MASK_ = '******'

const UserSchema = new Schema({
  email: { type: Schema.Types.String, required: true },
  password_crypt: { type: Schema.Types.String, required: true },
  password_salt: { type: Schema.Types.String, required: true }
})

UserSchema.virtual('password')
  .get(function () {
    return decrypt(this.password_crypt, this.password_salt)
  })
  .set(function (value) {
    const { crypt, salt } = encrypt(value)

    this.set('password_crypt', crypt)
    this.set('password_salt', salt)
  })

UserSchema.statics.generateDoc = (reqBody, dbDoc) => {
  const doc = {}

  doc.email = reqBody.email
  doc.password = reqBody.password

  return doc
}

UserSchema.statics.generateResponse = (doc) => {
  const toReturn = {}
  if (doc.toObject) doc = doc.toObject()

  toReturn.email = doc.email
  if (doc.password_crypt) toReturn.password = _MASK_

  return toReturn
}

const model = mongoose.model('User', UserSchema)
module.exports = model
