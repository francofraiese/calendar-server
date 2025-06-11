import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateUsersTable1749627020287 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "users",
        columns: [
          {
            name: "id",
            type: "uuid",
            isPrimary: true,
            default: "uuid_generate_v4()",
          },
          {
            name: "email",
            type: "text",
            isNullable: false,
            isUnique: true,
          },
          {
            name: "password",
            type: "text",
            isNullable: false,
          },
          {
            name: "user_timezone",
            type: "text",
            isNullable: false,
            default: `'UTC'`,
          },
          {
            name: "created_at",
            type: "timestamp",
            default: "now()",
          },
          {
            name: "updated_at",
            type: "timestamp",
            default: "now()",
          },
        ],
      }),
      true
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("users");
  }
}
