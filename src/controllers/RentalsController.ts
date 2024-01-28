import { Request, Response } from "express"
import { BooksRepository } from "../repositories/booksRepository"
import { CopyRepository } from "../repositories/copyRepository"
import { RentalRepository } from "../repositories/rentalRepository"
import { BookRepository } from "../repositories/bookRepository"
import { UserRepository } from "../repositories/userRepository"

export class RentalsController {
  async create(req: Request, res: Response) {
    try {
      const { bookId } = req.body
      
      const book = await BooksRepository.findOne({ where: { id: bookId } })
      if (!book) return res.status(400).json({ message: 'Book not found' })

      if (book.copies.length <= 0) return res.status(400).json({ message: 'Book not available' })
  
      const copy = book.copies.find(copy => copy.available === true)
      if (!copy) return res.status(400).json({ message: 'Book not available' })

      if (req.user.books?.find(userBook => userBook.isbn === book.isbn)) return res.status(400).json({ message: 'You already have this book' })
  
      copy.available = false
      await CopyRepository.save(copy)
  
      const rental = RentalRepository.create({
        copy,
        user: req.user,
        rentedAt: new Date(),
        returnedAt: new Date(),
        delay: 0
      })
      await RentalRepository.save(rental)

      const bookToSave = BookRepository.create({
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        copy,
        user: req.user
      })
      await BookRepository.save(bookToSave)

      return res.status(201).json({ message: 'Rental created', rental })
    } catch (error) {
      console.log(error)
    }
  }
}