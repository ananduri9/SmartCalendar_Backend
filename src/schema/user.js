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
            syncTime: Number!
        ): Boolean!
        deleteAccount(userID: ID!): Boolean!
    }

    type User {
        userID: ID!
        email: String!
        firstName: String!
        lastName: String!
        oAuthToken: String!
        syncTime: Number!
        
        group: Group!
    }
    
    type Token {
        token: String!
    }
`
