import { Request, Response } from "express";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import { userRepository } from "../repositories/userRepository";
import { BadRequestError } from "../helpers/api-erros";

export class LoginController {
  async login(req: Request, res: Response) {
    const { email, password } = req.body

    const userExists = await userRepository.findOne({ where: { email } }) 
    if (!userExists) return res.status(400).send('Email or password incorrect')
    
    const passwordMatch = await bcrypt.compare(password, userExists.password)
    if (!passwordMatch) return res.status(400).send('Email or password incorrect')

    const token = jwt.sign({ id: userExists.id }, process.env.JWT_PASS as string, { expiresIn: '1d' })

    const { password: _, ...user } = userExists

    return res.status(200).json({ user, token })
  }
}