import mongoose from 'mongoose'

const eventSchema = new mongoose.Schema({
    date: {
        type: Date,
    },
    completed: {
        type: Boolean,
    },
    habit: {
        type: Boolean,
    },
    ical: {
        type: Object,
    },
    user: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
    habit: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Habit' }],
});