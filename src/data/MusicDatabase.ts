import { Music } from "../model/Music";
import { BaseDatabase } from "./BaseDatabase";

export class MusicDatabase extends BaseDatabase{
    private static TABLE_NAME: string = 'musics'

    public async createMusic(id: string, title: string, author: string, date: string, file: string, genre: MUSIC_GENRE[], album: string): Promise<void>{
        await this.getConnection()
        .insert({
            id,
            title,
            author,
            date,
            file,
            genre,
            album
        })
        
        .into(MusicDatabase.TABLE_NAME)
    }

    public async getMusicById(id: string): Promise<Music>{
        const result = await this.getConnection()
        .select("*")
        .from(MusicDatabase.TABLE_NAME)
        .where({id})
    
        const myMusic = Music.convertToMusicModel(result[0])
    
        return myMusic
    }
}

export enum MUSIC_GENRE{
    SERTANEJO = "SERTANEJO",
    FUNK = "FUNK",
    ROCK = "ROCk",
    MPB = "MPB",
    FORRO = "FORRÓ",
    REGGAE = "REGGAE"
}