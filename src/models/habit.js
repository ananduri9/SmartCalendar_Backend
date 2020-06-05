import mongoose from 'mongoose'

const habitSchema = new mongoose.Schema({
  id: {
    type: Number,
    required: true
  },
  // user_id: {
  //   type: Number,
  //   required: true
  // },
  // group_id: {
  //   type: Number
  // },
  habit_name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  start_date: {
    type: Date
  },
  end_date: {
    type: Date
  },
  frequency: {
    type: Number
  },
  completion_pct: {
    type: Number
  }

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
})

const Habit = mongoose.model('Habit', habitSchema)
export default Habit