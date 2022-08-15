/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
*/


import connectDB from '../../../db/connection'
import Model from '../../../models/user'


export default async function getall(req, res) {

  try{
    await connectDB()

    const users = await Model.find();
    if (!users) return res.status(204).json({ 'message': 'No users found' });


    res.json(users);
    
  } catch (err) {
    res.send({
      error: "You must be sign in to view the protected content on this page.",
      message: err.toString()
    })
  }
}