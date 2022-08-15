import { Schema, model, models } from 'mongoose'

const heartSchema = new Schema({
  name: String, 
  color: {
    type: String,
    default: "#ff00a5" // pink 
  }, 
  count: {
    type: Number,
    default: 1
  },
})

const Heart = models.Heart || model('Heart', heartSchema)

export default Heart