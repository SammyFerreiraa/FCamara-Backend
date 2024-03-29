import { Column, Entity, ManyToOne, OneToMany, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Copy } from "./Copy";

@Entity('books')
export class Books {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  image: string

  @Column({nullable: true})
  category: string

  @Column({ default: false })
  recommended: boolean

  @Column()
  author: string

  @Column()
  isbn: string

  @Column()
  delays: number

  @OneToMany(() => Copy, (copy) => copy.book, {
    cascade: true
  })
  copies: Copy[]
}