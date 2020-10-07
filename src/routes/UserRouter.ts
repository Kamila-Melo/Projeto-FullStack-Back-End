import express from 'express'
import { UserController } from '../controller/UserController'

export const UserRouter = express.Router()

UserRouter.post("/signup", new UserController().signUp)
UserRouter.post("/login", new UserController().login)