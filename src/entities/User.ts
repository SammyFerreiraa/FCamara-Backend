import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";

@Entity("users")
export class User {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  name: string

  @Column()
  email: string

  @Column()
  address: string
  
  @Column()
  city: string

  @OneToMany(() => Book, (book) => book.user, {
    eager: true, cascade: true
  })
  books: Book[]
}