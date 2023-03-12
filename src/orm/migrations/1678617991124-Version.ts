import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1678617991124 implements MigrationInterface {
    name = 'Version1678617991124'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`region\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`region\` ADD \`createdAt\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`department\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`department\` ADD \`createdAt\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`equipment\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`equipment\` ADD \`createdAt\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`exposition\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`exposition\` ADD \`createdAt\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`rock_type\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`rock_type\` ADD \`createdAt\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`engagement\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`engagement\` ADD \`createdAt\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`route_profile\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`route_profile\` ADD \`createdAt\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`level\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`level\` ADD \`createdAt\` datetime NOT NULL`);
        await queryRunner.query(`ALTER TABLE \`secteur\` ADD \`isActive\` tinyint NOT NULL DEFAULT 1`);
        await queryRunner.query(`ALTER TABLE \`secteur\` ADD \`createdAt\` datetime NOT NULL`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`secteur\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`secteur\` DROP COLUMN \`isActive\``);
        await queryRunner.query(`ALTER TABLE \`level\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`level\` DROP COLUMN \`isActive\``);
        await queryRunner.query(`ALTER TABLE \`route_profile\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`route_profile\` DROP COLUMN \`isActive\``);
        await queryRunner.query(`ALTER TABLE \`engagement\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`engagement\` DROP COLUMN \`isActive\``);
        await queryRunner.query(`ALTER TABLE \`rock_type\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`rock_type\` DROP COLUMN \`isActive\``);
        await queryRunner.query(`ALTER TABLE \`exposition\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`exposition\` DROP COLUMN \`isActive\``);
        await queryRunner.query(`ALTER TABLE \`equipment\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`equipment\` DROP COLUMN \`isActive\``);
        await queryRunner.query(`ALTER TABLE \`department\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`department\` DROP COLUMN \`isActive\``);
        await queryRunner.query(`ALTER TABLE \`region\` DROP COLUMN \`createdAt\``);
        await queryRunner.query(`ALTER TABLE \`region\` DROP COLUMN \`isActive\``);
    }

}
