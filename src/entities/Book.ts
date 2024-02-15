import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Copy } from "./Copy";
import { Rental } from "./Rental";

@Entity('book')
export class Book {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  author: string

  @Column()
  image: string

  @Column()
  isbn: string

  @OneToOne(() => Copy, {
    eager: true
  })
  @JoinColumn()
  copy: Copy

  @OneToOne(() => Rental, {
    eager: true
  })
  @JoinColumn()
  rental: Rental

  @ManyToOne(() => User, (user) => user.books, {
    eager: false,
  })
  @JoinColumn()
  user: User
}