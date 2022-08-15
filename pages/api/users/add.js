/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
*/

import connectDB from '../../../db/connection'
import Model from '../../../models/user'
const bcrypt = require('bcrypt');

export default async function addUser(req, res) {

  try {
    const { email, name, password, color } = req.body

    // console.log('-- connecting to mongo --');
    await connectDB()
    // console.log('-- CONNECTED to mongo --');

    const hashedPwd = await bcrypt.hash(password, 10);

    //create and store the new user
    const newUser = await Model.create({
      "email": email,
      "name": name,
      "color": color,
      "password": hashedPwd
    });
    console.log(newUser);

    // console.log('-- users/add.js --')
    // const newModel = await Model.create(newUser) 
    // console.log(req.body)
    // console.log('-- -- -- -- -- -- ')

    res.status(201).json({ success: true, message: `new user create: ${newUser}` })

  } catch (err) {
    console.error(err)
    res.status(400).json({ status: 'failed to create user', message: err.toString() })
  }
}