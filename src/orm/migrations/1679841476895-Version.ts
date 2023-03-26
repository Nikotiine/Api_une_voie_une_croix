import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1679841476895 implements MigrationInterface {
    name = 'Version1679841476895'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`route\` ADD \`authorId\` bigint NULL`);
        await queryRunner.query(`ALTER TABLE \`route\` ADD CONSTRAINT \`FK_6f8b6b55cdf82e2349805db384d\` FOREIGN KEY (\`authorId\`) REFERENCES \`user\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`route\` DROP FOREIGN KEY \`FK_6f8b6b55cdf82e2349805db384d\``);
        await queryRunner.query(`ALTER TABLE \`route\` DROP COLUMN \`authorId\``);
    }

}
