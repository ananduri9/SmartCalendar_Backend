import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
    	user_habit(
    		id: ID
        	user_id: ID
        ): Habit

        user_habits(user_id: ID): [Habit!]

        group_habit(
        	id: ID
        	group_id: ID
        ): [Habit!]

    }

    extend type Mutation {
    	createHabit(
    		habit: Habit
        ): Boolean!

        updateHabit(
	        habit: Habit
        ): Boolean!

        removeHabit(
	        habit: Habit
        ): Boolean!

        accomplishHabit(
        	id: ID
        	user_id: ID
        ): Boolean!

    }

    scalar Date

	type MyType {
	   created: Date
	}

    type Habit {
        id: ID
        user_id: ID
        group_id: ID!
        habit_name: String
        description: String!
        start_date: Date
        frequency: Int
        completion_prct: Int
    }

`
