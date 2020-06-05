import { UserInputError } from 'apollo-server-express'

import { GraphQLScalarType } from 'graphql';
import { Kind } from 'graphql/language';

const resolverMap = {
  Date: new GraphQLScalarType({
    name: 'Date',
    description: 'Date custom scalar type',
    parseValue(value) {
      return new Date(value); // value from the client
    },
    serialize(value) {
      return value.getTime(); // value sent to the client
    },
    parseLiteral(ast) {
      if (ast.kind === Kind.INT) {
        return new Date(+ast.value) // ast value is always in string format
      }
      return null;
    },
  }),
};

export default {
  Query: {
    user_habit: async (parent, {id, user_id}, { models }) => {
      if (!me) {
        return null
      }
      return await models.Habit.findOne({ _id: me.id, user_id: user_id})
    },

    user_habits: async (parent, { user_id }, { models }) => {
        return await models.Habit.find({ user_id: user_id })
    },

    group_habits: async (parent, args, { models }) => {
        return await models.User.find({})
    },

  Mutation: {
    createHabit: async () => {


    },

    updateHabit: async () => {


    },

    deleteUser: async () => {


    }
}