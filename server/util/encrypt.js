'use strict'

const crypto = require('crypto')
const nconf = require('nconf')

const encrypt = (value) => {
  let salt, crypt
  if (!value) {
    return {
      crypt, salt
    }
  } else {
    salt = crypto.randomBytes(32).toString('hex')
    const key = crypto.pbkdf2Sync(nconf.get('DATA_ENCRYPTION_PASSWORD'), salt, 25000, 32, 'sha1')
    const iv = crypto.pbkdf2Sync(nconf.get('DATA_ENCRYPTION_PASSWORD'), salt, 25000, 16, 'sha1')
    const cipher = crypto.createCipheriv('aes-256-cbc', key, iv)
    crypt = cipher.update(value, 'utf8', 'hex')
    crypt += cipher.final('hex')
    return {
      crypt, salt
    }
  }
}

const decrypt = (crypt, salt) => {
  const key = crypto.pbkdf2Sync(nconf.get('DATA_ENCRYPTION_PASSWORD'), salt, 25000, 32, 'sha1')
  const iv = crypto.pbkdf2Sync(nconf.get('DATA_ENCRYPTION_PASSWORD'), salt, 25000, 16, 'sha1')
  const decipher = crypto.createDecipheriv('aes-256-cbc', key, iv)
  let dec = decipher.update(crypt, 'hex', 'utf8')
  dec += decipher.final('utf8')
  return dec
}

exports.encrypt = encrypt
exports.decrypt = decrypt
