import { Request, Response } from 'express'
import { UserRepository } from '../repositories/userRepository'
import bcrypt from 'bcrypt'
import { CopyRepository } from '../repositories/copyRepository'
import { BookRepository } from '../repositories/bookRepository'
import { BooksRepository } from '../repositories/booksRepository'
import { RentalRepository } from '../repositories/rentalRepository'

export class UserController {
  async create (req : Request, res: Response) {
    try {
      const { name, email, address, city, password } = req.body

      const userExists = await UserRepository.findOne({ where: { email } })
      if (userExists) return res.status(400).json({'message': 'User already exists'})

      const hashedPassword = await bcrypt.hash(password, 10)

      const newUser = UserRepository.create({
        name,
        email,
        address,
        city,
        password: hashedPassword
      })
      await UserRepository.save(newUser)

      return res.status(201).json({'message': 'User created'})
    } catch (error) {
      console.log(error)
    }  
  }

    async getUser (req: Request, res: Response) {
      try {
        return res.status(200).json(req.user)
      } catch (error) {
        console.log(error)
      }
    }

    async updateUser (req: Request, res: Response) {
      try {
        const { name, email, address, city, password } = req.body
        const user = req.user

        const hashedPassword = await bcrypt.hash(password, 10)
        
        user.name = name
        user.email = email
        user.address = address
        user.city = city
        user.password = hashedPassword

        await UserRepository.save(user)

        return res.status(200).json({'message': 'User updated'})
      } catch (error) {
        console.log(error)
      }
    }

    async deleteUser (req: Request, res: Response) {
      try {
        const user = await UserRepository.findOne({ where: { id: req.user.id } })

        if (!user) return res.status(400).json({'message': 'User not found'})
        if (!user.books) return res.status(400).json({'message': 'User has no books'})

        for (const book of user.books) {
          const bookCopy = await BookRepository.findOne({ where: { id: book.id } });
          console.log(bookCopy)

          const bookEntity = await BooksRepository.findOne({ where: { isbn: book.isbn } })
          if (!bookEntity) return res.status(400).json({'message': 'Book not found'})
    
          if (bookCopy) {
            const copy = await CopyRepository.findOne({ where: { book: bookEntity } })
            if (!copy) return res.status(400).json({'message': 'Copy not found'})

            const rental = await RentalRepository.findOne({ where: { copy, user } })
            if (!rental) return res.status(400).json({'message': 'User has no rental'})

            copy.available = true
            
            await CopyRepository.save(copy);
            await RentalRepository.remove(rental)
            await BookRepository.remove(bookCopy);
          }
        }
        
        await UserRepository.remove(user)

        return res.status(200).json({'message': 'User deleted'})
      } catch (error) {
        console.log(error)
      }
    }
}