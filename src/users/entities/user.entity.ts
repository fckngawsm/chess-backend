import { Column, Entity, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class User {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  phone: string;

  @Column()
  nickname: string;

  @Column()
  avatar: string;

  @Column()
  password: string;

  @Column()
  bio: string;
}
