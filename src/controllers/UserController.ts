import { Request, Response } from 'express'
import { userRepository } from '../repositories/userRepository'
import { BadRequestError } from '../helpers/api-erros'
import bcrypt from 'bcrypt'

export class UserController {
  async create (req : Request, res: Response) {
    try {
      const { name, email, address, city, password } = req.body

      const userExists = await userRepository.findOne({ where: { email } })
      if (userExists) return res.status(400).send('User already exists')

      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = userRepository.create({
        name,
        email,
        address,
        city,
        password: hashedPassword
      })
      await userRepository.save(newUser)

      return res.status(201).send('User created')
    } catch (error) {
      console.log(error)
    }  
 }
}