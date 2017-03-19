import {Schema} from 'mongoose';

export default new Schema({
  userId: {
    type: String,
    required: true,
    index: true,
  },

  hash: {
    type: String,
    required: true,
  }
}, {
  timestamps: true
})