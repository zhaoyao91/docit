import {Schema} from 'mongoose';

export default new Schema({
  email: String,
  password: String,
}, {timestamps: true})