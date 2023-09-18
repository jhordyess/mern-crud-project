import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import process from 'process'

import userRouter from './routes/user.routes.js'
import employeeRouter from './routes/employee.routes.js'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json()) //?
app.use(cors({ origin: '*' }))

app.use('/', userRouter)
app.use('/employee', employeeRouter)

app.listen(port, () => {
  console.log('Server initialized')
})
