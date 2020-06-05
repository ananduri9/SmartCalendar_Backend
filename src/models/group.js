import mongoose from 'mongoose'
import bcrypt from 'bcrypt'

const groupSchema = new mongoose.Schema({
  groupName: {
    type: String
  },
  groupID: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true
  },
  users : [ { type: mongoose.Schema.Types.ObjectId, ref: 'User' } ]
  //https://stackoverflow.com/questions/30822078/how-would-i-develop-a-relationship-user-belongs-to-groups-in-mongoose-node-js
})

userSchema.statics.getUsers = async function (groupID) {
    const users = await this.findOne({        
      groupID: groupID
    })
    return users
}
//printing array?

const Group = mongoose.model('Group', groupSchema)
export default Group