import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        group(groupID: ID!): Group
        groupUsers: [User!]
    }

    extend type Mutation {
        addUser(
            email: String!
            firstName: String!
            lastName: String!
        ): Boolean!
        removeUser(
            email: String!
            firstName: String!
            lastName: String!
        ): Boolean!
    }

    type Group {
        groupID: ID!
        groupName: String!
        groupMembers: [User!]
    }

    type User {
        userID: ID!
        email: String!
        firstName: String!
        lastName: String!
    }
`
