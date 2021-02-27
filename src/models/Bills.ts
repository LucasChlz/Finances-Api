import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";

@Entity("bills")
class Bills {

    @PrimaryColumn()
    readonly id: string

    @Column()
    name: string;

    @Column()
    description: string;

    @Column()
    value: number;

    @Column()
    payed: number;

    @CreateDateColumn()
    expiration: Date;

    @CreateDateColumn()
    created_at: Date;

}

export { Bills }