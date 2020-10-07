import express from 'express'
import { MusicController } from '../controller/MusicController'

export const MusicRouter = express.Router()

MusicRouter.post("/", new MusicController().createMusic)