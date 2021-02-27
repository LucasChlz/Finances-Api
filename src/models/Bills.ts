import { User } from './User';
import { Column, CreateDateColumn, Entity, JoinColumn, ManyToOne, PrimaryColumn, PrimaryGeneratedColumn } from "typeorm";

@Entity("bills")
class Bills {

    @PrimaryGeneratedColumn("uuid")
    readonly id: string

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    value: number;

    @Column()
    payed: number;

    @Column()
    user_id: string

    @ManyToOne(() => User)
    @JoinColumn({ name: "user_id"})
    user: User

    @Column()
    expiration: string;

    @CreateDateColumn()
    created_at: Date;

}

export { Bills }