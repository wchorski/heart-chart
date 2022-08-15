/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
*/

import { stringify } from 'querystring';
import connectDB from '../../../db/connection'
import Model from '../../../models/user'
const bcrypt = require('bcrypt');

import { authOptions } from "../auth/[...nextauth]"
import ROLES_LIST from '../../../config/roles_list'
import { unstable_getServerSession } from "next-auth/next"


export default async function usersByID(req, res) {

  console.log(req.method);
  if (req.method === 'GET') {
    // console.log("* method GET === " + req.method)
    try {
      await connectDB()

      const user = await Model.findById(req.query.id)
      res.status(200).json(user)
      return

    } catch (error) {
      return res.status(404).json({ success: false, message: error.toString() })
    }
  }


  const session = await unstable_getServerSession(req, res, authOptions)

  // if not logged in
  if(!session){
    res.status(401).json({status: "unauthorized", message: "must have an account"})
    return
  }
  if(!session.user.roles.admin){
    res.status(401).json({status: "unauthorized", message: "must have admin privileges"})
    return
  }

  if(session.user.roles.admin === ROLES_LIST.admin){
    if (req.method === 'PATCH') {
      console.log("* method PATCH === " + req.method)
      try {
        await connectDB()

        const user = await Model.findById(req.body._id)

        const usrCryptPass = req.body;

        if(req.body.password){
          const hashedPwd = await bcrypt.hash(req.body.password, 10)
          usrCryptPass.password = hashedPwd
        }
        Object.assign(user, usrCryptPass)
        res.status(200).json(user)
        user.save()
        return

      } catch (err) {
        console.error(err);
        res.status(400).json({ status: 'failed to update post', message: err.toString() })
      }
    }

    if (req.method === 'DELETE') {
      console.log("* method DELETE === " + req.method)
      try {
        await connectDB()

        const user = await Model.findByIdAndDelete(req.query.id)
        res.status(200).json({...user, message: "user deleted"})
        return

      } catch (error) {
        return res.status(404).json({ success: false, message: error.toString() })
      }
    }
  }

}