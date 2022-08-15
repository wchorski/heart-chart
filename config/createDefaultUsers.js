/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

import connectDB from '../db/connection'
import Model from '../models/user'
import fakeData from './defaultUsers.json'
const bcrypt = require('bcrypt');

export default async function createDefaultUsers(req, res) {
  try {
    // await connectDB()
    const users = await Model.find();

    if (users.length === 0) {
      console.log('-- NO USERS FOUND --');
      console.log('-- CREATING DEFAULT --');

      fakeData.map(async (usr) => {

        const { email, name, password, color, roles } = usr

        const hashedPwd = await bcrypt.hash(password, 10);

        const newUser = await Model.create({
          "email": email,
          "name": name,
          "color": color,
          "password": hashedPwd,
          "roles": roles
        });
        console.log(newUser);
      })

      console.log('-- -- -- -- -- --');
    }

  } catch (err) {
    console.log('no users created');
    // res.status(400).json({ status: 'failed to create default user', message: err.toString() })
  }
}
