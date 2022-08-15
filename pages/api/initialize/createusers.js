/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
*/

const defaultUsers = require('../../../config/defaultUsers.json')

export default function createusers(req, res) { 
  res.json(defaultUsers)
}