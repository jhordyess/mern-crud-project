import dotenv from 'dotenv'
dotenv.config()

import express from 'express'
import morgan from 'morgan'
import cors from 'cors'
import process from 'process'

import { expressMiddleware } from '@apollo/server/express4'
import { server } from './apolloServer'
import { createContext } from './context'

const app = express()
const port = process.env.PORT || 3000

app.use(morgan('dev'))
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors({ origin: '*' }))

app.use(
  '/graphql',
  expressMiddleware(server, {
    context: createContext
  })
)

app.listen(port, () => {
  console.info('Server initialized, listening on port:', port)
})
