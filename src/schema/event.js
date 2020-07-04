import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        allEvents(userId: ID!): [Event!]
        events(userId: ID!, habitId: ID!): [Event!]
    }

    extend type Mutation {
        addEvent(
            date: String!
            description: String!
            start: String!
            end: String!
            location: String
            habitId: ID
            ): Event
        updateEvent(
            eventId: ID!
            date: String!
            description: String!
            start: String!
            end: String!
            completed: Boolean
            location: String
            habitId: ID
            ): Event
        removeEvent(eventID: ID): Boolean

        accomplish(eventId: ID): Boolean
        reschedule(
            eventId: ID
            start: String!
            end: String!
        ): Event
    }

    type Event {
        id: ID!
        date: String!
        completed: Boolean
        habit: Boolean
        ical: Calendar

        user: User
        habits: [Habit]
    }

    type Calendar {
        description: String
        location: String
        start: String
        end: String
    }
`
