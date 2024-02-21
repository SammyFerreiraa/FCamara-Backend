import { Request, Response } from "express"
import { BooksRepository } from "../repositories/booksRepository"
import { CopyRepository } from "../repositories/copyRepository"
import { RentalRepository } from "../repositories/rentalRepository"
import { BookRepository } from "../repositories/bookRepository"
import { UserRepository } from "../repositories/userRepository"
import moment from 'moment'

export class RentalsController {
  async create(req: Request, res: Response) {
    try {
      const { bookId } = req.body

      if (!req.user.delays) req.user.delays = 0
      if (req.user.delays >= 3) return res.status(400).json({ message: 'You have too many delays' })
      
      const book = await BooksRepository.findOne({ where: { id: bookId } })
      if (!book) return res.status(400).json({ message: 'Book not found' })
      
      if (req.user.books?.find(userBook => userBook.isbn === book.isbn)) return res.status(400).json({ message: 'You already have this book' })
      
      const copy = await CopyRepository.findOne({ where: { book, available: true } })
      if (!copy) return res.status(433).json({ message: 'Book not available' })

  
      copy.available = false
      await CopyRepository.save(copy)

      const rental = RentalRepository.create({
        copy,
        user: req.user,
        rentedAt: new Date(),
      })
      await RentalRepository.save(rental)

      const bookToSave = BookRepository.create({
        category: book.category,
        image: book.image,
        title: book.title,
        author: book.author,
        isbn: book.isbn,
        copy,
        rental,
        user: req.user
      })
      await BookRepository.save(bookToSave)

      return res.status(201).json({ 
        rental: {
          id: bookToSave.id,
          title: bookToSave.title,
          category: bookToSave.category,
          author: bookToSave.author,
          image: bookToSave.image,
          isbn: bookToSave.isbn,
          copy,
          rental,
      } })
    } catch (error) {
      console.log(error)
    }
  }

  async returnBook(req: Request, res: Response) {
    try {
      const { id } = req.params

      const user = await UserRepository.findOne({ where: { id: req.user.id } })
      if (!user) return res.status(400).json({ message: 'User not found' })

      const book = await BookRepository.findOne({ where: { id } })
      if (!book) return res.status(400).json({ message: 'Book not found' })

      const OficialBook = await BooksRepository.findOne({ where: { isbn: book.isbn } })
      if (!OficialBook) return res.status(400).json({ message: 'Oficial Book not found' })

      const copy = await CopyRepository.findOne({ where: { id: book.copy.id } })
      if (!copy) return res.status(400).json({ message: 'Copy not found' })

      const rental = await RentalRepository.findOne({ where: { id: book.rental.id } })
      if (!rental) return res.status(400).json({ message: 'Rental not found' })

      rental.returnedAt = new Date()
      await RentalRepository.save(rental)

      const dataEntrega = moment(rental.rentedAt).add(7, 'days').format('L')
      const devolvido = moment(rental.returnedAt).format('L')

      if (moment(devolvido).isAfter(dataEntrega)) {
        rental.delay = moment(devolvido).diff(dataEntrega, 'days')
        user.delays++
        OficialBook.delays++
      } else {
        rental.delay = 0
      }
      
      copy.available = true

      await BooksRepository.save(OficialBook)
      await CopyRepository.save(copy)
      await RentalRepository.save(rental)
      await BookRepository.remove(book)
      await UserRepository.save(user)

      res.status(200).json({ message: 'Book returned' })
    } catch (error) {
      console.log(error)
    }
  }

  async getRentals (req: Request, res: Response) {
    const { id } = req.params

    const rentals = await RentalRepository.find({ where: { user: { id } } })
    if (!rentals) return res.status(400).json({ message: 'Rentals not found' })
    
    return res.status(200).json(rentals)
  }
}