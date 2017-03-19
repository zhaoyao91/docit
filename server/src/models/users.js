import { Schema } from 'mongoose'

export default new Schema({
  email: {
    type: String,
    index: true,
    unique: true,
    sparse: true,
  },

  password: {
    hash: String,
    algorithm: String,
    round: Number
  }
}, {
  timestamps: true
})