import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class Bills1614458777954 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "bills",
                columns: [
                    {
                        name: 'id',
                        type: 'varchar',
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
                        type: 'varchar'
                    },
                    {
                        name: 'payed',
                        type: 'int'
                    },
                    {
                        name: 'user_id',
                        type: 'varchar'
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()'
                    }
                ],
                foreignKeys: [
                    {
                       name: 'FKUser',
                       referencedTableName: "users" ,
                       referencedColumnNames: ["id"],
                       columnNames: ["user_id"],
                       onDelete: "CASCADE",
                       onUpdate: "CASCADE"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("bills");
    }

}
