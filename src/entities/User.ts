import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";
import { Favorites } from "./Favorites";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  password: string

  @Column()
  address: string
  
  @Column()
  city: string

  @Column()
  delays: number

  @OneToMany(() => Book, (book) => book.user, {
    eager: true
  })
  books: Book[]

  @OneToMany(() => Favorites, (favorite) => favorite.user, {
    eager: true
  })
  favorites: Book[]
}