import { Request, Response } from "express"
import { BooksRepository } from "../repositories/booksRepository"
import { CopyRepository } from "../repositories/copyRepository"
import { RentalRepository } from "../repositories/rentalRepository"
import { BookRepository } from "../repositories/bookRepository"
import { check, validationResult } from "express-validator"

// Define an interface for the Book type
interface Book {
  id: number;
  title: string;
  category: Category;
  recommended: boolean;
  image: string;
  author: string;
  isbn: string;
  delays: number;
  copies: Copy[];
}

// Define an interface for the Copy type
interface Copy {
  id: number;
  book: Book;
  available: boolean;
}

// Define an enum for the Category type
enum Category {
  Fiction,
  NonFiction,
  Biography,
  History,
  Science,
  etc
}

// Define a type guard for the Book type
function isBook(book: any): book is Book {
  return book && book.id && book.title && book.category && book.recommended && book.image && book.author && book.isbn && book.delays && book.copies
}

// Define a type guard for the Copy type
function isCopy(copy: any): copy is Copy {
  return copy && copy.id && copy.book && copy.available
}

export class CopyController {
  // Use express-validator middleware to validate the input data
  validateInput() {
    return [
      check('bookId').isInt().withMessage('Book ID must be an integer'),
    ]
  }

  async create(req: Request, res: Response) {
    // Use destructuring assignment to extract the property of req.body
    const { bookId } = req.body

    // Use validationResult to get the errors from the validation
    const errors = validationResult(req)
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() })
    }

    // Use async/await syntax to handle promises
    try {
      // Use generics to specify the type of the repository method
      const book = await BooksRepository.findOne<Book>({ where: { id: bookId } })
      // Use type guard to check the type of the variable
      if (!isBook(book)) return res.status(400).json({'message': 'Book not found'})

      // Use generics to specify the type of the repository method
      const copy = CopyRepository.create<Copy>({
        book,
        available: true
      })
      // Use generics to specify the type of the repository method
      await CopyRepository.save<Copy>(copy)

      return res.status(201).json({"message": "Copy created", copy})
    } catch (error) {
      console.log(error)
    }
  }

  async listAll(req: Request, res: Response) {
    try {
      // Use generics to specify the type of the repository method
      const copies = await CopyRepository.find<Copy[]>()
      return res.status(200).json(copies)
    } catch (error) {
      console.log(error)
    }
  }

  async delete(req: Request, res: Response) {
    // Use destructuring assignment to extract the property of req.params
    const { id } = req.params

    try {
      // Use generics to specify the type of the repository method
      const copy = await CopyRepository.findOne<Copy>({ where: { id } })
      // Use type guard to check the type of the variable
      if (!isCopy(copy)) return res.status(400).json({'message': 'Copy not found'})
  
      // Use generics to specify the type of the repository method
      const rental = await RentalRepository.findOne({ where: { copy } })
      if (!rental) return res.status(400).json({'message': 'Copy not available'})
      await RentalRepository.remove(rental)

      // Use generics to specify the type of the repository method
      const book = await BookRepository.findOne<Book>({ where: { copy } })
      // Use type guard to check the type of the variable
      if (!isBook(book)) return res.status(400).json({'message': 'Book not found'})
      await BookRepository.remove(book)
  
      // Use generics to specify the type of the repository method
      await CopyRepository.delete<Copy>(copy)
      return res.status(200).json({'message': 'Copy deleted'})
    } catch (error) {
      console.log(error)
    }
  }
}
