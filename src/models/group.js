import mongoose from 'mongoose'
import bcryptjs from 'bcryptjs'

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

const Group = mongoose.model('Group', groupSchema)
export default Group