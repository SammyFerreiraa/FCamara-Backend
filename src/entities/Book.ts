import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Copy } from "./Copy";

@Entity('book')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  author: string

  @Column()
  isbn: string

  @OneToOne(() => Copy)
  copy: Copy

  @ManyToOne(() => User, (user) => user.books)
  user: User
}