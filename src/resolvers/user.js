import jwt from 'jsonwebtoken'
import { UserInputError } from 'apollo-server-express'
import { combineResolvers } from 'graphql-resolvers'
import bcrypt from 'bcrypt'

const createToken = async (user, secret) => {
  const { userID, email, firstName, lastName } = user
  return jwt.sign({ userID, email, firstName, lastName }, secret)
}

const generatePasswordHash = async function (password) {
  const saltRounds = 10
  return await bcrypt.hash(password, saltRounds)
}

export default {
  Query: {
    me: async (parent, args, { models, user }) => {
      if (!user) {
        return null
      }
      return await models.User.findOne({ _id: user.id })
    }
  },

  Mutation: {
    signUp: async (
      parent,
      { email, password, firstName, lastName, oAuthToken},
      { models, secret }
    ) => {
      const user = await new models.User({
        email,
        password: await generatePasswordHash(password),
        firstName,
        lastName,
        oAuthToken
      })
      if (!user) {
        throw new UserInputError('Sign up failed.')
      }

      try {
        await user.save()
      } catch (err) {
        console.error(err)
        throw new UserInputError('Failed to update models.')
      }
      return { token: createToken(user, secret) }
    },

    signIn: async (
      parent,
      { email, password },
      { models, secret }
    ) => {
      const user = await models.User.findByLogin(email)
      if (!user) {
        throw new UserInputError('No user found with this login credentials.')
      }

      const isValid = await user.validatePassword(password)
      if (!isValid) {
        throw new Error('Invalid password.')
      }
      return { token: createToken(user, secret) }
    },

    updateSyncTime: async (
      parent, {syncTime}, {models}
    ) => {
      try {
        const sync = await models.User.findOne({syncTime})
      
        if (!sync) {
          throw new UserInputError('Sync Time not found')
        }

        sync.syncTime = syncTime
        sync.save()
        return true;      
      } catch(err) {
        console.error(err)
        return false
      }

    },

    deleteAccount: combineResolvers(
      async (parent, args, { models, user }) => {
        try {
          await models.User.findOneAndRemove({ _id: user.id })
        } catch (err) {
          console.error(err)
          throw new UserInputError('Failed to delete user')
        }
        return true
      }
    )
  }
}