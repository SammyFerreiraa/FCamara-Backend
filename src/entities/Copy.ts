import { Column, Entity, ManyToOne, OneToMany, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Rental } from "./Rental";
import { Books } from "./Books";

@Entity('copies')
export class Copy {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  available: boolean

  @ManyToOne(() => Books, (books) => books.copies, {
    eager: true
  })
  book: Books
}