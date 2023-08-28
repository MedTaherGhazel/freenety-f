const serveFavicon = require('serve-favicon')
const express = require('express')
const morgan = require('morgan')

const userRouter = require('./routes/user.router')

const app = express()

app.use(morgan('dev'))
app.use(express.json())

// Middleware
app.use('/', (req, res, next) => {
  console.log('Middleware for all routes')
  next()
})

// Route handlers
app.get('/', (req, res) => {
  res.send('Hello, this is the root route!')
})
app.use(serveFavicon('/favicon.ico'))
app.use('/api', userRouter)

// const port = process.env.PORT || 3000
// app.listen(port, () =>
//   console.log(`Server is running on http://localhost:${port}`)
// )

module.exports = app
