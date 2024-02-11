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
routes.post('/register', userController.create) // Create user
routes.post('/infos', userController.getByEmail) // Get user by email

routes.use('/users', authMiddleware) // Middleware to protect routes
routes.get('/users', userController.getUser) // Get user
routes.put('/users', userController.updateUser) // Update user
routes.delete('/users', userController.deleteUser) // Delete user

routes.use('/books', authMiddleware) // Middleware to protect routes
routes.post('/books', booksController.create) // Create book
routes.get('/books', booksController.listAll) // List all books
routes.put('/books/:id', booksController.update) // Update book
routes.delete('/books/:id', booksController.delete) // Delete book

routes.use('/copies', authMiddleware) // Middleware to protect routes
routes.post('/copies', copyController.create) // Create copy
routes.get('/copies', copyController.listAll) // List all copies
routes.delete('/copies/:id', copyController.delete) // Delete copy

routes.use('/rentals', authMiddleware) // Middleware to protect routes
routes.post('/rentals' ,rentalsController.create) // Create rental
routes.delete('/rentals/:id', rentalsController.returnBook) // Return book

routes.use('/delay', authMiddleware) // Middleware to protect routes
routes.get('/delay', booksController.delayedBooks) // List all delayed books

export default routes