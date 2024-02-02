import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { LoginController } from './controllers/LoginController'
import { BooksController } from './controllers/BooksController'
import { CopyController } from './controllers/CopyController'
import { RentalsController } from './controllers/RentalsController'
import { authMiddleware } from './middlewares/authMiddleware'

const routes = Router()

const loginController = new LoginController()
const userController = new UserController()
const booksController = new BooksController()
const copyController = new CopyController()
const rentalsController = new RentalsController()

routes.post('/login', loginController.login) // Login route

routes.post('/users', userController.create) // Create user
routes.get('/users', authMiddleware, userController.getUser) // Get user
routes.put('/users', authMiddleware, userController.updateUser) // Update user
routes.delete('/users', authMiddleware, userController.deleteUser) // Delete user

routes.post('/books', authMiddleware, booksController.create) // Create book
routes.get('/books', booksController.listAll) // List all books
routes.put('/books/:id', authMiddleware, booksController.update) // Update book
routes.delete('/books/:id', authMiddleware, booksController.delete) // Delete book

routes.post('/copies', authMiddleware, copyController.create) // Create copy
routes.get('/copies', copyController.listAll) // List all copies
routes.delete('/copies/:id', authMiddleware, copyController.delete) // Delete copy

routes.post('/rentals', authMiddleware ,rentalsController.create) // Create rental
routes.delete('/rentals/:id', authMiddleware, rentalsController.returnBook) // Return book

routes.get('/delay', authMiddleware, booksController.delayedBooks) // List all delayed books

export default routes