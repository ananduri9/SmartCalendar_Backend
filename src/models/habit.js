import mongoose from 'mongoose'

const habitSchema = new mongoose.Schema({
  group_id: {
    type: Number
  },
  name: {
    type: String,
    required: true
  },
  description: {
    type: String
  },
  start_date: {
    type: Date,
    required: true
  },
  end_date: {
    type: Date,
    required: true
  },
  frequency: {
    type: Number,
    required: true
  },
  completed: {
    type: Number,
    required: true
  },
  missed: {
    type: Number,
    required: true
  },

  user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },

})

const Habit = mongoose.model('Habit', habitSchema)
export default Habit