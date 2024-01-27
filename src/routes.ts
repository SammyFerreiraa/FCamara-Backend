import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { LoginController } from './controllers/LoginController'
import { BooksController } from './controllers/BooksController'
import { CopyController } from './controllers/CopyController'

const routes = Router()

routes.post('/users', new UserController().create)
routes.post('/login', new LoginController().login)

routes.post('/books', new BooksController().create)
routes.get('/books', new BooksController().list)

routes.post('/copies', new CopyController().create)

export default routes