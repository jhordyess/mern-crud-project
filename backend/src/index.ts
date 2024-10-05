import dotenv from 'dotenv'
import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import process from 'process'

import userRouter from './routes/user.routes'
import employeeRouter from './routes/employee.routes'

import { expressMiddleware } from '@apollo/server/express4'
import { server } from './apolloServer'

dotenv.config()
const app = express()
const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({ origin: '*' }))

app.use('/', userRouter)
app.use('/employee', employeeRouter)
app.use('/graphql', expressMiddleware(server))

app.listen(port, () => {
  console.info('Server initialized, listening on port:', port)
})
