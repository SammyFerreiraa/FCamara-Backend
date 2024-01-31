import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { LoginController } from './controllers/LoginController'
import { BooksController } from './controllers/BooksController'
import { CopyController } from './controllers/CopyController'
import { RentalsController } from './controllers/RentalsController'
import { authMiddleware } from './middlewares/authMiddleware'

const routes = Router()

routes.post('/users', new UserController().create)
routes.get('/users', authMiddleware, new UserController().getUser)
routes.put('/users', authMiddleware, new UserController().updateUser)
routes.delete('/users', authMiddleware, new UserController().deleteUser)

routes.post('/login', new LoginController().login)

routes.post('/books', authMiddleware, new BooksController().create)
routes.get('/books', new BooksController().listAll)
routes.put('/books/:id', authMiddleware, new BooksController().update)

routes.post('/copies', new CopyController().create)

routes.post('/rentals', authMiddleware ,new RentalsController().create)

export default routes