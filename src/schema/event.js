import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        allEvents(userId: ID!): [Event!]
        events(userId: ID!, habitID: ID!): [Event!]
    }

    extend type Mutation {
        addEvent(
            date: String!
            description: String!
            start: String!
            end: String!
            location: String
            ): Event
        updateEvent(
            eventId: ID!
            date: String!
            description: String!
            start: String!
            end: String!
            location: String
            ): Event
        removeEvent(eventID: ID): Boolean

        accomplish(eventId: ID): Boolean
        reschedule(eventId: ID): Event
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
        descritpion: String
        location: String
        start: String
        end: String
    }
`
