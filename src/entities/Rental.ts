import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Copy } from "./Copy";
import { User } from "./User";
import { Book } from "./Book";

@Entity("rentals")
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @ManyToOne(() => Copy, {
    eager: true
  })
  @JoinColumn()
  copy: Copy

  @Column()
  rentedAt: Date

  @Column({
    nullable: true
  })
  returnedAt: Date

  @Column({
    nullable: true
  })
  delay: number

  @OneToOne(() => Book)
  book: Book

  @ManyToOne(() => User)
  @JoinColumn()
  user: User
}