import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1682587119689 implements MigrationInterface {
    name = 'Version1682587119689'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notebook\` ADD \`achievementType\` enum ('A Vue', 'Flash', 'Travail') NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notebook\` DROP COLUMN \`achievementType\``);
    }

}
