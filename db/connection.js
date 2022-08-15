import mongoose from 'mongoose'
import createDefaultUsers from '../config/createDefaultUsers'
// import { createDefaultUsers } from '../config/createDefaultUsers'

const USER = process.env.MONGO_USER
const PWD = encodeURIComponent(process.env.MONGO_PASSWORD)
const URI = process.env.MONGO_URI
const PORT = process.env.MONGO_PORT
const COLLECTION = process.env.MONGO_COLLECTION

const mongoURL = (USER === 'localhost' || USER === 'undefined')
  ? `mongodb://${URI}:${PORT}/${COLLECTION}`
  : `mongodb://${USER}:${PWD}@${URI}:${PORT}/${COLLECTION}?authSource=admin`


const connectDB = async () => {
  try {
    await mongoose.connect(mongoURL, {
      family: 4 // Use IPv4, skip trying IPv6
    });

    console.log('-- Connected to MongoDB -- ')

    createDefaultUsers()

  } catch (err) {
    console.error(err);
  }
}

export default connectDB
// module.exports = connectDB