import { Column, Entity, JoinColumn, OneToMany, PrimaryGeneratedColumn } from "typeorm";
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
  password: string

  @Column()
  address: string
  
  @Column()
  city: string

  @OneToMany(() => Book, (book) => book.user, {
    eager: true
  })
  @JoinColumn()
  books: Book[]
}