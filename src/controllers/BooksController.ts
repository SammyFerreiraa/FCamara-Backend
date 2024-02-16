import { Request, Response } from "express"
import { BooksRepository } from "../repositories/booksRepository"
import { BookRepository } from "../repositories/bookRepository"
import { CopyRepository } from "../repositories/copyRepository"
import { RentalRepository } from "../repositories/rentalRepository"

export class BooksController {
  async create(req: Request, res: Response) {
    const { title, author, isbn, image, recommended, category } = req.body

    if (title === '' || author === '' || isbn === '' || image === '' || category === '') return res.status(400).json({'message': 'All fields are required'})

    const bookExists = await BooksRepository.findOne({ where: { isbn } })
    if (bookExists) return res.status(400).json({'message': 'Book already exists'})

    const book = BooksRepository.create({
      title,
      category,
      recommended,
      image,
      author,
      isbn,
      delays: 0,
      copies: []
    })
    await BooksRepository.save(book)

    return res.status(201).json(book)
  }

  async listAll(req: Request, res: Response) {
    const books = await BooksRepository.find()
    return res.status(200).json(books)
  }

  async update(req: Request, res: Response) {
    try {
      const { title, author, isbn, image, recommended, category } = req.body
      const id = req.params.id
  
      const book = await BooksRepository.findOne({ where: { id } })
      if (!book) return res.status(400).json({'message': 'Book not found'})

      book.category = category
      book.recommended = recommended
      book.image = image
      book.title = title
      book.author = author
      book.isbn = isbn
      await BooksRepository.save(book)
  
      return res.status(200).json(book)
    } catch (error) {
      console.log(error)
    }
  }

  async delete(req: Request, res: Response) {
    try {
      const id = req.params.id

      const book = await BooksRepository.findOne({ where: { id } })
      if (!book) return res.status(400).json({'message': 'Book not found'})

      const copy = await CopyRepository.find({ where: { book } })
      if (!copy) return res.status(400).json({'message': 'Copy not found'})

      await BookRepository.delete({ isbn: book.isbn })
      
      copy.map(async (copy) => {
        await RentalRepository.delete({ copy })
      })

      await CopyRepository.delete({ book })
      await BooksRepository.delete({ id })

      return res.status(200).json({'message': 'Book deleted'})
    } catch (error) {
      console.log(error)
    }
  } 

  async delayedBooks (req: Request, res: Response) {
    try {
      const books = await BooksRepository.find()
      const delayedBooks = books.filter(book => book.delays > 0)
      return res.status(200).json(delayedBooks)
    } catch (error) {
      console.log(error)
    }
  }

  async getLibrary (req: Request, res: Response) {
    try {
      return res.status(200).json(req.user.books)
    } catch (error) {
      console.log(error)
    }
  }
}