import { MUSIC_GENRE } from "../data/MusicDatabase"

export class Music{
    constructor(
        private id: string,
        private title: string,
        private author: string,
        private date: string,
        private file: string,
        private genre: MUSIC_GENRE[],
        private album: string
    ){}

    getId() {return this.id}
    getTitle() {return this.title}
    getAuthor() {return this.author}
    getDate() {return this.date}
    getFile() {return this.file}
    getGenre() {return this.genre}
    getAlbum() {return this.album}

    setId(id: string) {this.id = id}
    setTitle(title: string) {this.title = title}
    setAuthor(author: string) {this.author = author}
    setDate(date: string){this.date = date}
    setFile(file: string) {this.file = file}
    setGenre(genre: MUSIC_GENRE[]) {this.genre = genre}
    setAlbum(album: string) {this.album = album}

    static convertToMusicModel(music: any): Music{
        return new Music(music.id, music.title, music.author, music.date, music.file, music.genre, music.album)
    }
}

export interface CreateMusicInputDTo{
    title: string,
    author: string,
    date: string,
    file: string,
    genre: MUSIC_GENRE[],
    album: string
}