import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1679827427713 implements MigrationInterface {
    name = 'Version1679827427713'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` ADD \`sitesId\` bigint NULL`);
        await queryRunner.query(`CREATE UNIQUE INDEX \`IDX_ca3f5be1d127c2f10bf6dc0029\` ON \`route\` (\`name\`, \`secteurId\`)`);
        await queryRunner.query(`ALTER TABLE \`user\` ADD CONSTRAINT \`FK_62bbb32dfad4d4b54314e88e508\` FOREIGN KEY (\`sitesId\`) REFERENCES \`site\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`user\` DROP FOREIGN KEY \`FK_62bbb32dfad4d4b54314e88e508\``);
        await queryRunner.query(`DROP INDEX \`IDX_ca3f5be1d127c2f10bf6dc0029\` ON \`route\``);
        await queryRunner.query(`ALTER TABLE \`user\` DROP COLUMN \`sitesId\``);
    }

}
