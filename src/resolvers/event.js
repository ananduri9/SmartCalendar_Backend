export default {
    Query: {
      allEvents: async (parent, { userId }, { models }) => {
        const events = models.Event.find({})
        if (!events) {
          throw new UserInputError('Incorrect user id.')
        }
        return events
      },
      events: async (parent, { userId, habitId }, { models }) => {
        const events = models.Event.find({ user: userId, habit: habitId })
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

    },

    Event: {
        user: async (game, args, { models }) => {

        },

        habits: async (game, args, { models }) => {

        },
    }
}
