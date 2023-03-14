import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1678616515515 implements MigrationInterface {
    name = 'Version1678616515515'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`approach_type\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`approach_type\` ADD \`createdAt\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`approach_type\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`approach_type\` DROP COLUMN \`isActive\``);
    }

}
