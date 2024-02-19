import { BooksRepository } from "../repositories/booksRepository"
import { FavoriteRepository } from "../repositories/favoriteRepository"
import { Request, Response } from 'express'

export class FavoritesController {
  async add(req: Request, res: Response) {
    try {
      const { bookId } = req.body
      const book = await BooksRepository.findOne({ where: { id: bookId } })
      if (!book) return res.status(400).json({ message: 'Book not found' })
      const fav = await FavoriteRepository.findOne({ where: { isbn: book.isbn } })
      if (fav) return res.status(400).json({ message: 'Favorite already exists' })
      const favorite = FavoriteRepository.create({
        author: book.author,
        category: book.category,
        image: book.image,
        isbn: book.isbn,
        title: book.title,
        user: req.user
      })
      await FavoriteRepository.save(favorite)
      return res.status(201).json({ message: 'Favorite created', favorite })
    }
     catch (error) {
      console.log(error)
    }   
  }

  async remove (req: Request, res: Response) {
    try {
      const { bookId } = req.body
      const book = await BooksRepository.findOne({ where: { id: bookId } })
      if (!book) return res.status(400).json({ message: 'Book not found' })
      const favorite = await FavoriteRepository.findOne({ where: { isbn: book.isbn, user: req.user } })
      if (!favorite) return res.status(400).json({ message: 'Favorite not found' })
      await FavoriteRepository.remove(favorite)
      return res.status(200).json({ message: 'Favorite removed' })
    } catch (error) {
      console.log(error)
    }
  }
}