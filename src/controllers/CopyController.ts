import { Request, Response } from "express"
import { BooksRepository } from "../repositories/booksRepository"
import { CopyRepository } from "../repositories/copyRepository"

export class CopyController {
  async create(req: Request, res: Response) {
    const { bookId } = req.body

    const book = await BooksRepository.findOne({ where: { id: bookId } })
    if (!book) return res.status(400).json({'message': 'Book not found'})

    const copy = CopyRepository.create({
      book,
      available: true
    })
    await CopyRepository.save(copy)

    return res.status(201).json({"message": "Copy created", copy})
  }

  async listAll(req: Request, res: Response) {
    const copies = await CopyRepository.find()
    return res.status(200).json(copies)
  }
}