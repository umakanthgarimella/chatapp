const express = require('express')
const helmet = require('helmet')
const nconf = require('nconf').argv().env()
const bodyParser = require('body-parser')

const databaseUtil = require('./database')
const { getRouter } = require('./routes')

nconf.file({ file: 'server/env/development.json' })

databaseUtil.connect()

const PORT = nconf.get('PORT')
const app = express()

app.use(helmet())

app.listen(PORT, () => {
  console.log(`logName=serverStarted, port=${PORT}`)
})

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

app.use('/v1', getRouter())

app.use((err, req, res, next) => {
  if (!err) return next()
  console.error(`
        code: ${err.code},
        message: ${err.message},
        stack: ${err.stack}
    `)
  return res.status(500).json({
    errors: [{
      code: 'unexpected',
      message: 'Something blew'
    }]
  })
})
