/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
*/

// const ROLES = require('./roles_list')
import connectDB from '../../../db/connection'
const User = require('../../../models/user');
const bcrypt = require('bcrypt');
const defaultUsers = require('../../../config/defaultUsers.json')

export default function createusers(req, res) { 
  // console.log('createusers');
  res.json(defaultUsers)
}