import {Schema} from 'mongoose';

export default new Schema({
  email: {
    type: String,
    index: true,
    unique: true,
    sparse: true,
  }
}, {
  timestamps: true
})