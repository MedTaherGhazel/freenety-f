const serveFavicon = require('serve-favicon')
const bodyParser = require('body-parser')
const express = require('express')
const morgan = require('morgan')

const userRouter = require('./routes/user.router')

const app = express()

app.use(morgan('dev'))
app.use(express.json())

app.use(bodyParser.json())
app.use(bodyParser.urlencoded({ extended: false }))

// applications access middleware
app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*")
  res.setHeader(
    "Access-Control-Allow-Header",
    "Origin,  X-Requested-With, Content-Type, Accept"
  )
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  )
  next()
})

// Routes Middleware
app.use('/', (req, res, next) => {
  console.log('Incoming Request:', req.method, req.url);
  next()
})

// Route handlers
app.get('/', (req, res) => {
  res.send('Hello, this is the root route!')
})

app.use(serveFavicon('./backend/favicon.ico'))
app.use('/api', userRouter)

// const port = process.env.PORT || 3000
// app.listen(port, () =>
//   console.log(`Server is running on http://localhost:${port}`)
// )

module.exports = app
