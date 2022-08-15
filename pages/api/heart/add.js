/**
 * @param {import('next').NextApiRequest} req
 * @param {import('next').NextApiResponse} res
 */

import connectDB from '../../../db/connection'
import Heart from '../../../models/heartModel'


export default async function addHeart(req, res) {
  const {name, count } = req.body

  try{
    // console.log('-- connecting to mongo --');
    await connectDB()
    // console.log('-- CONNECTED to mongo --');
  
  
    console.log('-- add.js Heart --')
    const hrt = await Heart.create(req.body) 
    console.log(req.body)
    console.log('-- -- -- -- -- -- ')
  
    res.status(200).json({ hrt })

  } catch (err){
    res.status(400).json({message: err.toString()})
  }
}