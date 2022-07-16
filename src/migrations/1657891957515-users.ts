import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class users1657891957515 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(new Table({
            name: "users",
            columns: [
                {
                    name: "id",
                    type: "int4",
                    isPrimary: true,
                    isGenerated: true,
                    generationStrategy: "increment",
                },
                {
                    name: "firstName",
                    type: "nvarchar",
                    isNullable: false
                },
                {
                    name: "lastName",
                    type: "nvarchar",
                    isNullable: false
                },
                {
                    name: "username",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "password",
                    type: "varchar",
                },
                {
                    name: "email",
                    type: "varchar",
                    isUnique: true
                },
                {
                    name: "phone",
                    type: "varchar",
                    isUnique: true
                }
            ]
        }), false)
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.query(`DROP TABLE users`);
    }

}
