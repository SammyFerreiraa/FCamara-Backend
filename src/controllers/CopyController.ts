import { Request, Response } from "express"
import { BooksRepository } from "../repositories/booksRepository"
import { CopyRepository } from "../repositories/copyRepository"
import { RentalRepository } from "../repositories/rentalRepository"
import { BookRepository } from "../repositories/bookRepository"

export class CopyController {
  async create(req: Request, res: Response) {
    try {
      const { bookId } = req.body

      const book = await BooksRepository.findOne({ where: { id: bookId } })
      if (!book) return res.status(400).json({'message': 'Book not found'})

      const copy = CopyRepository.create({
        book,
        available: true
      })
      await CopyRepository.save(copy)

      return res.status(201).json({"message": "Copy created", copy})
    } catch (error) {
      console.log(error)
    }
  }

  async listAll(req: Request, res: Response) {
    const copies = await CopyRepository.find()
    return res.status(200).json(copies)
  }

  async delete(req: Request, res: Response) {
    try {
      const { id } = req.params
      const copy = await CopyRepository.findOne({ where: { id } })
      if (!copy) return res.status(400).json({'message': 'Copy not found'})
  
      const rental = await RentalRepository.findOne({ where: { copy } })
      if (!rental) return res.status(400).json({'message': 'Copy not available'})
      await RentalRepository.remove(rental)

      const book = await BookRepository.findOne({ where: { copy } })
      if (!book) return res.status(400).json({'message': 'Book not found'})
      await BookRepository.remove(book)
  
      await CopyRepository.delete(copy)
      return res.status(200).json({'message': 'Copy deleted'})
    } catch (error) {
      console.log(error)
    }
  }
}