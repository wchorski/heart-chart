/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
*/

import { unstable_getServerSession } from "next-auth/next"
import { authOptions } from "../auth/[...nextauth]"

import connectDB from '../../../db/connection'
import Model from '../../../models/user'

export default async function getUser(req, res) {
  try {
    await connectDB()

    const user = await Model.findById(req.body._id)

    res.status(200).json(user)

  } catch (err) {
    console.error(err);
    res.status(400).json({ status: 'failed to user_details', message: err.toString() })
  }
}