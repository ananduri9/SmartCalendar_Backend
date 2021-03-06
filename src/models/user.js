import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true
  },
  firstName: {
    type: String
  },
  lastName:{ 
    type: String
  },
  password: {
    type: String,
    required: true,
    unique: true
  },
  oAuthToken:{
    type: String
    //correct format?
  },
  syncTime: {
    type: Number
  },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }
})

userSchema.methods.validatePassword = async function (password) {
  return await bcryptjs.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)
export default User