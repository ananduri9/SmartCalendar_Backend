import { gql } from 'apollo-server-express'

export default gql`
    extend type Query {
    	getHabit(
    		id: ID
        ): Habit

        getHabits(): [Habit!]

        getGroupHabit(
        	id: ID
        	group_id: ID
        ): Habit

    }

    extend type Mutation {
    	createHabit(
    		habit: Habit
        ): Boolean!

        updateHabit(
	        habit: Habit
        ): Boolean!

        updateHabitGroup(
	        habit: Habit
        ): Boolean!

        removeHabit(
        	id: ID
        ): Boolean!

        removeAllUserHabits(): Boolean!

    }

    scalar Date

	type MyType {
	   created: Date
	}

    type Habit {
    	"Habit ID"
        id: ID
        "Habit user ID"
        user_Id: ID
        "Habit group ID -- optional"
        group_Id: ID!
        "Habit name"
        name: String
        "Habit description -- optional"
        description: String!
        "Habit start date"
        start_Date: Date
        "Habit end date"
        end_Date: Date
        frequency: Int
        "Habit completion #"
        completion: Int
        "Habit missed #"
        missed: Int
    }

`
