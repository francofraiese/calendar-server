import { MigrationInterface, QueryRunner, TableColumn } from "typeorm";

export class AddEventColumnFinishDate1749771479755
  implements MigrationInterface
{
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.addColumn(
      "events",
      new TableColumn({
        name: "end_date",
        type: "timestamp",
        isNullable: false,
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropColumn("events", "end_date");
  }
}
