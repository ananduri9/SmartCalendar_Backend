import jwt from 'jsonwebtoken'
import { UserInputError } from 'apollo-server-express'
import { combineResolvers } from 'graphql-resolvers'
import user from './user'
import group from '../schema/group'

export default {
    Query: {
        group: async (parent, args, { groupID, models }) => {
            return await models.Group.findOne({_id: groupID})
        },

        groupUsers: async (parent, {groupID, groupUsers}, { models }) => { 
            return await models.Group.distinct({_id: groupID, users: groupUsers})
        }
    },
  
    Mutation: {
        addUser: async (parent, {groupID,userID}, {models}) => {
            const joinGroup = models.Group.findOne({_id: groupID})
            if (!joinGroup) {
                throw new UserInputError('Incorrect group id.')
            }
            try {
                await models.Group.groupUsers.push(userID)
                return true
            } catch(err) {
            console.error(err)
            return false
            }
        },
        removeUser: async (parent, { userID }, { models }) => {
            try {
              await models.Group.findOneAndRemove({ _id: userID })
            } catch (err) {
              console.error(err)
              throw new UserInputError('Failed to remove user')
            }
            return true
        }
    }
}
