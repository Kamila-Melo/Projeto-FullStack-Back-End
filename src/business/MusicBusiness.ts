import { MusicDatabase } from "../data/MusicDatabase";
import { CreateMusicInputDTo } from "../model/Music";
import { Authenticator } from "../services/Authenticator";
import { HashManager } from "../services/HashManager";
import { IdGenerator } from "../services/IdGenerator";

export class MusicBusiness{
    constructor(
        private musicDatabase: MusicDatabase,
        private hashManager: HashManager,
        private authenticator: Authenticator,
        private idGenerator: IdGenerator
    ){}

    public async createMusic(token: string, music: CreateMusicInputDTo): Promise<void>{
        this.authenticator.getData(token)

        if(!music){
            throw new Error("Enter all necessary information for registration")
        }

        const id = this.idGenerator.generateId()

        await this.musicDatabase.createMusic(
            id,
            music.title,
            music.author,
            music.date,
            music.file,
            music.genre,
            music.album
        )
    }
}