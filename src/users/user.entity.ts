
import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity({ name: "users" })
export class Users extends BaseEntity {

    @PrimaryGeneratedColumn()
    id: number;

    @Column({ length: 25 })
    firstName: string;

    @Column({ length: 25 })
    lastName: string;

    @Column({ length: 25 })
    username: string;

    @Column({ length: 25 })
    password: string;

    @Column({ length: 25 })
    email: string;

    @Column({ length: 25 })
    phone: string;

}