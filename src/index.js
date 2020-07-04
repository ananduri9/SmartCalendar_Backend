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

 const getUser = async (token) => {
  //PLACEHOLDER ONLY. NEED TO FIX!
  return await models.User.find({ Oauth_Token: token })
}

const server = new ApolloServer({
  typeDefs: schema,
  resolvers,
  context: ({ req, res }) => {
   //see this:
   //https://www.apollographql.com/docs/apollo-server/security/authentication/#putting-user-info-on-the-context
   const token = req.headers.authorization || '';

   // try to retrieve a user with the token
   const user = getUser(token);
   if (!user) throw new AuthenticationError('you must be logged in'); 

   // add the user to the context
   return { models, user };
  },
  introspection: true,
  playground: true,
  context: () => {
      return {
        models
    }
  }
})

server.applyMiddleware({ app, path: '/graphql' })

const port =  8000

const eraseDatabaseOnSync = false
connectDb().then(async () => {
  if (isTest || eraseDatabaseOnSync) {
    await Promise.all([
      models.User.deleteMany({}),
      models.Group.deleteMany({}),
      models.Habit.deleteMany({}),
      models.Event.deleteMany({}),
    ])
  }

  app.listen({ port }, () => {
    console.log(`Apollo Server on http://localhost:${port}/graphql`)
  })
})


