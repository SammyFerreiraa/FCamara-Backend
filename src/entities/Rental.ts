import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryGeneratedColumn } from "typeorm";
import { Copy } from "./Copy";
import { User } from "./User";

@Entity("rentals")
export class Rental {
  @PrimaryGeneratedColumn('uuid')
  id: number

  @ManyToOne(() => Copy)
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

  @ManyToOne(() => User)
  @JoinColumn()
  user: User
}