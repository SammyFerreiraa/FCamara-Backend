import { NextFunction, Request, Response } from "express"
import { UserRepository } from "../repositories/userRepository"
import jwt from 'jsonwebtoken'

interface JwtPayload {
  id: string
}

export const authMiddleware = async (req: Request, res: Response, next: NextFunction) => {
  const { authorization } = req.headers
  if (!authorization) return res.status(401).json({'message': 'Unauthorized'})

  const token = authorization.split(' ')[1]
  
  try {
    const { id } = jwt.verify(token, process.env.JWT_PASS as string) as JwtPayload
    
    const userExist = await UserRepository.findOneBy({ id })
    if (!userExist) return res.status(401).json({'message': 'Unauthorized'})
      
    const {password: _, ...user } = userExist
  
    req.user = user
  
    next()
  } catch (error) {
    return res.status(401).json({'message': 'Unauthorized'})
  }
}