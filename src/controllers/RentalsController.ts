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
      
      if (req.user.books?.find(userBook => userBook.isbn === book.isbn)) return res.status(400).json({ message: 'You already have this book' })
      
      const copy = await CopyRepository.findOne({ where: { book, available: true } })
      if (!copy) return res.status(400).json({ message: 'Book not available' })

  
      copy.available = false
      await CopyRepository.save(copy)
  
      const rental = RentalRepository.create({
        copy,
        user: req.user,
        rentedAt: new Date(),
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

  async returnBook(req: Request, res: Response) {
    try {
      const { id } = req.params

      const book = await BookRepository.findOne({ where: { id } })
      if (!book) return res.status(400).json({ message: 'Book not found' })

      const copy = await CopyRepository.findOne({ where: { id: book.copy.id } })
      if (!copy) return res.status(400).json({ message: 'Copy not found' })

      const rental = await RentalRepository.findOne({ where: { copy, user: req.user } })
      if (!rental) return res.status(400).json({ message: 'Rental not found' })

      rental.returnedAt = new Date()
      
      copy.available = true
      await CopyRepository.save(copy)

      await RentalRepository.save(rental)

      await BookRepository.remove(book)

      res.status(200).json({ message: 'Book returned' })
    } catch (error) {
      console.log(error)
    }
  }
}