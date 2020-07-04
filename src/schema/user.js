import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
        me: User
    }

    extend type Mutation {
        signUp(
            email: String!
            password: String!
            firstName: String!
            lastName: String!
            oAuthToken: String!
        ): Token!
        signIn(
            email: String!
            password: String!
            oAuthToken: String!
        ): Token!
        updateSyncTime(
            syncTime: Int!
        ): Boolean!
        deleteAccount(userID: ID!): Boolean!
    }

    type User {
        email: String!
        firstName: String!
        lastName: String!
        oAuthToken: String!
        syncTime: Int!
        
        group: Group!
    }
    
    type Token {
        token: String!
    }
`
