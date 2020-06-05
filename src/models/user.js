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

userSchema.statics.findByEmail = async function (email) {
  const user = await this.findOne({
    email: email
  })
  return user
}

userSchema.methods.validatePassword = async function (password) {
  return await bcrypt.compare(password, this.password)
}
//should i add update sync time function to \models or to the other files?

userSchema.pre('remove', function (next) {
  this.model('User').deleteOne({ user: this._id }, next)
})
//is this the function to delete users or was this just for the poker app?

const User = mongoose.model('User', userSchema)
export default User