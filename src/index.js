import 'core-js/stable'
import 'regenerator-runtime/runtime'
import cors from 'cors'
import express from 'express'
import 'dotenv/config'
import { ApolloServer } from 'apollo-server-express'

import schema from './schema'
import resolvers from './resolvers'
import models, { connectDb } from './models'

const app = express()

app.use(cors())

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  introspection: true,
  playground: true,
})

server.applyMiddleware({ app, path: '/graphql' })

const port =  8000

const eraseDatabaseOnSync = false
connectDb().then(async () => {
  if (isTest || eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Player.deleteMany({}),
      models.Game.deleteMany({})
    ])
  }

  app.listen({ port }, () => {
    console.log(`Apollo Server on http://localhost:${port}/graphql`)
  })
})
