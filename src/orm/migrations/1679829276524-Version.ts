import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1679829276524 implements MigrationInterface {
    name = 'Version1679829276524'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_62bbb32dfad4d4b54314e88e508\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`sitesId\``);
        await queryRunner.query(`ALTER TABLE \`site\` ADD \`authorId\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`site\` ADD CONSTRAINT \`FK_ed85cc0c1f2f7bd913ca4e0247e\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`site\` DROP FOREIGN KEY \`FK_ed85cc0c1f2f7bd913ca4e0247e\``);
        await queryRunner.query(`ALTER TABLE \`site\` DROP COLUMN \`authorId\``);
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`sitesId\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_62bbb32dfad4d4b54314e88e508\` FOREIGN KEY (\`sitesId\`) REFERENCES \`site\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

}
