import { async } from "regenerator-runtime"
import habit from "../schema/habit"

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
        addEvent: async (parent, args, { user, models }) => {
          const {
            date,
            description,
            start,
            end,
            location,
            habitId,
          } = args

          const ical = {
            description: description,
            location: location,
            start: start,
            end: end
          }

          const newEvent = new models.Event({
            date: date,
            completed: false,
            habit: habitId ? true : false,
            ical: ical,
    
            user: user.id,
            habits: habit.id
          })

          try {
            await newEvent.save()
          } catch (err) {
            console.error(err)
            throw new UserInputError('Failed to update models.')
          }

          return newEvent
        },

        updateEvent: async (parent, args, { models }) => {
          const {
            eventId,
            date,
            description,
            start,
            end,
            location,
            habitId,
            completed,
          } = args

          let oldEvent = await models.Event.findOne({ _id: eventId })
          if (!oldEvent) {
            throw new UserInputError('Failed to find event. Incorrect event id.')
          }

          const ical = {
            description: description,
            location: location,
            start: start,
            end: end
          }

          oldEvent.eventId = eventId
          oldEvent.date = date
          oldEvent.completed = completed
          oldEvent.ical = ical
          oldEvent.habits = habitId

          try {
            await oldEvent.save()
          } catch (err) {
            console.error(err)
            throw new UserInputError('Failed to update models.')
          }

          return oldEvent
        },

        removeEvent: async (parent, { eventId }, { models }) => {
          try {
            await models.Event.findOneAndRemove({ _id: eventId })
          } catch (err) {
            throw new UserInputError('Failed to delete event')
          }

          return true
        },

        accomplish: async (parent, { eventId }, { models }) => {
          let event = await models.Event.findOne({ _id: eventId })
          if (!event) {
            throw new UserInputError('Failed to find event. Incorrect event id.')
          }

          event.completed = true

          try {
            await event.save()
          } catch (err) {
            console.error(err)
            throw new UserInputError('Failed to update models.')
          }

          return true
        },

        reschedule: async (parent, { eventId, start, end }, { models }) => {
          let event = await models.Event.findOne({ _id: eventId })
          if (!event) {
            throw new UserInputError('Failed to find event. Incorrect event id.')
          }

          const ical = event.ical
          ical.start = start
          ical.end = end

          event.ical = ical

          try {
            await event.save()
          } catch (err) {
            console.error(err)
            throw new UserInputError('Failed to update models.')
          }

          return event
        },
    },

    Event: {
        user: async (event, args, { models }) => {
          const getEvent = await models.User.find({
            event: event.id
          })
          if (!getEvent) {
            throw new UserInputError('Failed to find event.')
          }
          return getEvent
        },

        habits: async (event, args, { models }) => {
          const getHabits = await models.Habit.find({
            event: event.id
          })
          if (!getHabits) {
            throw new UserInputError('Failed to find habits.')
          }
          return getHabits
        },
    }
}
