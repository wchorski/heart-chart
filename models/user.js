// import { Schema, model, models } from 'mongoose'
import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({

  email: {
    type: String,
    trim: true,
    lowercase: true,
    unique: true,
    required: 'Email address is required',
    match: [/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/, 'Please fill a valid email address']
  },
  password: {
    type: String,
    required: true
  },
  name: {
    type: String,
    required: true,
    unique: true // `email` must be unique
  },
  image: {
    type: String
  },
  color: {
    type: String,
    default: "#ff00a5"
  },
  heartCount:{
    type: Number,
    default: 1
  },

  roles: {
    subscriber: {
      type: Number,
      default: 2003
    },
    editor: Number,
    admin: Number
  },
  refreshToken: String,
  expires: Date
});

// const User = models.User || model('User', userSchema)
// export default User
export default mongoose.models.User || mongoose.model('User', userSchema)