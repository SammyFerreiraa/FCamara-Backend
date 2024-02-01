import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { LoginController } from './controllers/LoginController'
import { BooksController } from './controllers/BooksController'
import { CopyController } from './controllers/CopyController'
import { RentalsController } from './controllers/RentalsController'
import { authMiddleware } from './middlewares/authMiddleware'

const routes = Router()

routes.post('/login', new LoginController().login) // Login route

routes.post('/users', new UserController().create) // Create user
routes.get('/users', authMiddleware, new UserController().getUser) // Get user
routes.put('/users', authMiddleware, new UserController().updateUser) // Update user
routes.delete('/users', authMiddleware, new UserController().deleteUser) // Delete user

routes.post('/books', authMiddleware, new BooksController().create) // Create book
routes.get('/books', new BooksController().listAll) // List all books
routes.put('/books/:id', authMiddleware, new BooksController().update) // Update book
routes.delete('/books/:id', authMiddleware, new BooksController().delete) // Delete book

routes.post('/copies', authMiddleware, new CopyController().create) // Create copy
routes.get('/copies', new CopyController().listAll) // List all copies
routes.delete('/copies/:id', authMiddleware, new CopyController().delete) // Delete copy

routes.post('/rentals', authMiddleware ,new RentalsController().create) // Create rental

export default routes