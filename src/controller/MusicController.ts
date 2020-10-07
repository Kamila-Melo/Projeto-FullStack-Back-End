import {Request, Response} from 'express'
import { MusicBusiness } from '../business/MusicBusiness'
import { BaseDatabase } from '../data/BaseDatabase'
import { MusicDatabase } from '../data/MusicDatabase'
import { Authenticator } from '../services/Authenticator'
import { HashManager } from '../services/HashManager'
import { IdGenerator } from '../services/IdGenerator'
import dayjs from "dayjs"

export class MusicController{
    private static musicBusiness = new MusicBusiness(
        new MusicDatabase(),
        new HashManager(),
        new Authenticator(),
        new IdGenerator()
    )

    public async createMusic(req: Request, res: Response): Promise<void>{
        try {
            const token = req.headers.authorization as string

            const musicData = {
                title: req.body.title,
                author: req.body.author,
                date: dayjs().format("YYYY-MM-DD HH:mm:ss"),
                file: req.body.file,
                genre: req.body.genre.join(","),
                album: req.body.album
            }

            await MusicController.musicBusiness.createMusic(token, musicData)

            res.status(200).send({message: "Music created successfully!"})
        } catch (error) {
            res.status(400).send({message: error.message})
        }finally{
            await BaseDatabase.destroyConnection()
        }
    }
}