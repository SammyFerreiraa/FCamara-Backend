import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Copy } from "./Copy";

@Entity('books')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  author: string

  @Column()
  isbn: string

  @OneToMany(() => Copy, (copy) => copy.book)
  copies: Copy[]

  @ManyToOne(() => User, (user) => user.books)
  user: User
}