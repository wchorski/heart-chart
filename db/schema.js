import mongoose from 'mongoose'

const kittySchema = new mongoose.Schema({
  name: String
})

const kitten = mongoose.model('Kitten', kittySchema)

export default kitten;