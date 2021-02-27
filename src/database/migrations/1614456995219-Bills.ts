import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Bills1614456995219 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "bills",
                columns: [
                    {
                        name: 'id',
                        type: 'bigint',
                        isPrimary: true
                    },
                    {
                        name: 'name',
                        type: 'varchar',
                    },
                    {
                        name: 'description',
                        type: 'varchar'
                    },
                    {
                        name: 'value',
                        type: 'decimal'
                    },
                    {
                        name: 'expiration',
                        type: 'date'
                    },
                    {
                        name: 'payed',
                        type: 'int'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("bills");
    }

}

