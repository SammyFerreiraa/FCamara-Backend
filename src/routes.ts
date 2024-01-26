import { Router } from 'express'
import { UserController } from './controllers/UserController'
import { LoginController } from './controllers/LoginController'

const routes = Router()

routes.post('/users', new UserController().create)
routes.post('/login', new LoginController().login)

export default routes