import { Request, Response } from "express"
import { BooksRepository } from "../repositories/booksRepository"

export class BooksController {
  async create(req: Request, res: Response) {
    const { title, author, isbn } = req.body

    const bookExists = await BooksRepository.findOne({ where: { isbn } })
    if (bookExists) return res.status(400).json({'message': 'Book already exists'})

    const book = BooksRepository.create({
      title,
      author,
      isbn,
      copies: []
    })
    await BooksRepository.save(book)

    return res.status(201).json(book)
  }

  async list(req: Request, res: Response) {
    const books = await BooksRepository.find()
    return res.status(200).json(books)
  }
}