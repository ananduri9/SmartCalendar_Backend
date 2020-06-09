import { async } from "regenerator-runtime"

export default {
    Query: {
      allEvents: async (parent, { userId }, { models }) => {
        const events = await models.Event.find({user: userId})
        if (!events) {
          throw new UserInputError('Incorrect user id.')
        }
        return events
      },
      events: async (parent, { userId, habitId }, { models }) => {
        const events = await models.Event.find({ user: userId, habit: habitId })
        if (!events) {
          throw new UserInputError('Incorrect user or habit id.')
        }
        return events
      },
    },

    Mutation: {
        addEvent: async (parent, args, { models }) => {

        },

        updateEvent: async (parent, args, { models }) => {

        },

        removeEvent: async (parent, { eventId }, { models }) => {

        },

        accomplish: async (parent, { eventId }, { models }) => {

        },

        reschedule: async (parent, { eventId }, { models }) => {

        },

        missedEvent: async (parent, { eventId }, {models }) => {

        },
    },

    Event: {
        user: async (event, args, { models }) => {
          const event = await models.User.find({
            event: event.id
          })
          if (!event) {
            throw new UserInputError('Failed to find event.')
          }
          return event
        },

        habits: async (event, args, { models }) => {
          const habits = await models.Habit.find({
            event: event.id
          })
          if (!habits) {
            throw new UserInputError('Failed to find habits.')
          }
          return habits
        },
    }
}
