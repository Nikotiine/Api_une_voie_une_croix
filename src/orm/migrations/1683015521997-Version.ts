import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1683015521997 implements MigrationInterface {
    name = 'Version1683015521997'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`notebook\` ADD \`ranking\` int NULL`);
        await queryRunner.query(`ALTER TABLE \`route\` ADD \`effortType\` enum ('Resi', 'Bloc', 'Conti') NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`route\` DROP COLUMN \`effortType\``);
        await queryRunner.query(`ALTER TABLE \`notebook\` DROP COLUMN \`ranking\``);
    }

}
