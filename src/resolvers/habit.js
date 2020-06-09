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
    getHabit: async (parent, {id}, { models, user }) => {
      return await models.Habit.findOne({ _id: id, user: user.id})
    },

    getHabits: async (parent, args, { models, user }) => {
      return await models.Habit.find({ user: user.id })
    },

    getGroupHabit: async (parent, {id, group_id}, { models, user }) => {
      return await models.Habit.findOne({ _id: id, user: user.id, group_id: group_id})
    }

  },

  Mutation: {
    createHabit: async (parent, {habit}, { models, user }) => {

        const hab = new models.Habit({
          group_id: habit.group_Id,
          name: habit.name,
          description: habit.description,
          start_Date: start_date,
          end_Date: end_date,
          frequency: frequency,
          completion_Prct: completion_pct,
          user: user.id
        })

      try {
        if (!hab) {
          throw new UserInputError('Failed to create new Habit.')
        }

        hab.save()
        return true;
      } catch (e) {
        console.error(err)
        return false;
      }

    },

    updateHabit: async (parent, {habit}, { models, user }) => {

      try {

        const hab = await models.Habit.findOne({ _id: habit.id, user_id: user.id })

        if (!hab) {
          throw new UserInputError('Habit ID not found')
        }

        hab.group_id = habit.group_Id 
        hab.name = habit.name 
        hab.description = habit.description
        hab.start_date = habit.start_Date
        hab.end_date = habit.end_Date
        hab.frequency = habit.frequency
        hab.completion_pct = habit.completion_Prct

        hab.save()
        return true;
      } catch (e) {
        console.error(err)
        return false;
      }

    },

    updateHabitGroup: async (parent, {habit}, { models, user }) => {

      try {

        const hab = await models.Habit.findAll({ _id: habit.id, user_id: user.id })

        if (!hab) {
          throw new UserInputError('Habit ID not found')
        }

        hab.group_id = habit.group_Id 
        hab.name = habit.name 
        hab.description = habit.description
        hab.start_date = habit.start_Date
        hab.end_date = habit.end_Date
        hab.frequency = habit.frequency
        hab.completion = habit.completion
        hab.missed = habit.missed

        hab.save()
        return true;
      } catch (e) {
        console.error(err)
        return false;
      }

    },

    removeHabit: async (parent, {habit}, { models, user }) => {
      
      try {

        await models.Habit.findOneAndDelete({ _id: habit.id, user_id: user.id })
        return true;
      } catch (e) {
        console.error(err)
        return false;
      }

    },

    removeAllUserHabits: async (parent, args, { models, user }) => {
  
      try {

        await models.Habit.deleteMany({ user: user_id})
        return true;
      } catch (e) {
        console.error(err)
        return false;
      }

    }

  }
}