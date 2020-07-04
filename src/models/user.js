import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

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
  userID: {
    type: mongoose.Schema.Types.ObjectId,
    //do i need a ref
    required: true,
    unique: true
  },
  syncTime: {
    type: Number
  },
  group: { type: mongoose.Schema.Types.ObjectId, ref: 'Group' }
})

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}

const User = mongoose.model('User', userSchema)
export default User