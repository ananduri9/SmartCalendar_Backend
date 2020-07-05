import mongoose from 'mongoose'

import User from './user'
import Group from './group'
import Habit from './habit'
import Event from './event'

const db = process.env.DATABASE_URL

const connectDb = () => {
  return mongoose.connect(db, { user: process.env.DATABASE_USERNAME, pass: process.env.DATABASE_PASSWORD, useNewUrlParser: true, useUnifiedTopology: true })
}

const models = { User, Group, Habit, Event }

export { connectDb }
export default models
