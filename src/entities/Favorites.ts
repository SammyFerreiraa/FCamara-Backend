import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { User } from "./User";
import { Copy } from "./Copy";
import { Rental } from "./Rental";

@Entity('favorites')
export class Favorites {
  @PrimaryGeneratedColumn('uuid')
  id: string

  @Column()
  title: string

  @Column()
  author: string

  @Column()
  category: string

  @Column()
  image: string

  @Column()
  isbn: string

  @ManyToOne(() => User, (user) => user.favorites, {
    eager: false,
  })
  @JoinColumn()
  user: User
}