import { gql } from 'apollo-server-express'

import userSchema from './user'
import groupSchema from './group'
import habitSchema from './habit'
import eventSchema from './event'

const linkSchema = gql`
    type Query {
        _: Boolean         
    }

    type Mutation {
        _: Boolean   
    }
`

export default [linkSchema, userSchema, groupSchema, habitSchema, evenetSchema]
