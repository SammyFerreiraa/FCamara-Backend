import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { Book } from "./Book";

@Entity('copies')
export class Copy {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  available: boolean

  @ManyToOne(() => Book, (book) => book.copies)
  book: Book
}