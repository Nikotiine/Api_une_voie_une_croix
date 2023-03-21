import { MigrationInterface, QueryRunner } from "typeorm";

export class Version1679297811241 implements MigrationInterface {
    name = 'Version1679297811241'

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`CREATE TABLE \`exposition\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`label\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime NOT NULL, UNIQUE INDEX \`IDX_50aaaf23ba3e63c19c565451b4\` (\`label\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`route_profile\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`label\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime NOT NULL, UNIQUE INDEX \`IDX_f7619fc5ea6e0cad7b57140bfd\` (\`label\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`engagement\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`label\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime NOT NULL, UNIQUE INDEX \`IDX_336dad01ab7e3ea1a0c0e2ed69\` (\`label\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`rock_type\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`label\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime NOT NULL, UNIQUE INDEX \`IDX_8ebddfc1bc8400247a43785176\` (\`label\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`secteur\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime NOT NULL, \`siteId\` bigint NULL, UNIQUE INDEX \`IDX_63f3b02799a16a09851e6eee8e\` (\`name\`, \`siteId\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`region\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime NOT NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`department\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`lat\` double NOT NULL, \`lng\` double NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime NOT NULL, \`regionId\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`approach_type\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`label\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime NOT NULL, UNIQUE INDEX \`IDX_3bbe18bbcf18cf9ccb9a02eba6\` (\`label\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`site\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`approachTime\` int NOT NULL, \`averageRouteHeight\` int NOT NULL, \`averageRouteNumber\` int NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`mainParkingLat\` double NOT NULL, \`mainParkingLng\` double NOT NULL, \`secondaryParkingLat\` double NULL, \`secondaryParkingLng\` double NULL, \`water\` tinyint NOT NULL DEFAULT 0, \`wc\` tinyint NOT NULL DEFAULT 0, \`river\` tinyint NOT NULL DEFAULT 0, \`network\` tinyint NOT NULL DEFAULT 0, \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NULL, \`minLevelId\` bigint NULL, \`maxLevelId\` bigint NULL, \`equipmentId\` bigint NULL, \`engagementId\` bigint NULL, \`approachTypeId\` bigint NULL, \`rockTypeId\` bigint NULL, \`departmentId\` bigint NULL, \`regionId\` bigint NULL, UNIQUE INDEX \`IDX_9669a09fcc0eb6d2794a658f64\` (\`name\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`level\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`label\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime NOT NULL, UNIQUE INDEX \`IDX_b1644a53747694faf5869b0394\` (\`label\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`route\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`name\` varchar(255) NOT NULL, \`height\` int NOT NULL, \`quickdraw\` int NOT NULL, \`isActive\` tinyint NOT NULL, \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NULL, \`levelId\` bigint NULL, \`secteurId\` bigint NULL, \`equipmentId\` bigint NULL, \`engagementId\` bigint NULL, \`expositionId\` bigint NULL, \`rockTypeId\` bigint NULL, \`routeProfileId\` bigint NULL, PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`equipment\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`label\` varchar(255) NOT NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`createdAt\` datetime NOT NULL, UNIQUE INDEX \`IDX_99935ab824cba9096f178988dc\` (\`label\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`user\` (\`id\` bigint NOT NULL AUTO_INCREMENT, \`firstName\` varchar(255) NOT NULL, \`lastName\` varchar(255) NOT NULL, \`email\` varchar(255) NOT NULL, \`password\` varchar(255) NOT NULL, \`birthday\` datetime NOT NULL, \`createdAt\` datetime NOT NULL, \`updatedAt\` datetime NULL, \`isActive\` tinyint NOT NULL DEFAULT 1, \`role\` enum ('user', 'admin') NOT NULL DEFAULT 'user', UNIQUE INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` (\`email\`), PRIMARY KEY (\`id\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`site_expositions_exposition\` (\`siteId\` bigint NOT NULL, \`expositionId\` bigint NOT NULL, INDEX \`IDX_274dc6813356a68b9605973b97\` (\`siteId\`), INDEX \`IDX_7005cc2e6026b2bc3a7dc1713f\` (\`expositionId\`), PRIMARY KEY (\`siteId\`, \`expositionId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`CREATE TABLE \`site_route_profiles_route_profile\` (\`siteId\` bigint NOT NULL, \`routeProfileId\` bigint NOT NULL, INDEX \`IDX_6a2b74aa55e589a23bb8c54c73\` (\`siteId\`), INDEX \`IDX_718a6089f3ac0e2ec36d36313c\` (\`routeProfileId\`), PRIMARY KEY (\`siteId\`, \`routeProfileId\`)) ENGINE=InnoDB`);
        await queryRunner.query(`ALTER TABLE \`secteur\` ADD CONSTRAINT \`FK_fe1988d9ac1fda05119db7f166b\` FOREIGN KEY (\`siteId\`) REFERENCES \`site\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`department\` ADD CONSTRAINT \`FK_aa1c27dc9833cc7b7846a65493a\` FOREIGN KEY (\`regionId\`) REFERENCES \`region\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`site\` ADD CONSTRAINT \`FK_89b8d72be09808f74d17479eca7\` FOREIGN KEY (\`minLevelId\`) REFERENCES \`level\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`site\` ADD CONSTRAINT \`FK_644f7446b537a42d5969d93ad19\` FOREIGN KEY (\`maxLevelId\`) REFERENCES \`level\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`site\` ADD CONSTRAINT \`FK_18a0dc586039b403a7bcd59a35f\` FOREIGN KEY (\`equipmentId\`) REFERENCES \`equipment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`site\` ADD CONSTRAINT \`FK_9c135c4fcf455a0f8671d1328e3\` FOREIGN KEY (\`engagementId\`) REFERENCES \`engagement\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`site\` ADD CONSTRAINT \`FK_d51a59968499a0132e3bba4ba25\` FOREIGN KEY (\`approachTypeId\`) REFERENCES \`approach_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`site\` ADD CONSTRAINT \`FK_eb87dc44526a06ca73d6e6c5a49\` FOREIGN KEY (\`rockTypeId\`) REFERENCES \`rock_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`site\` ADD CONSTRAINT \`FK_14f1366c56de96714e66139270d\` FOREIGN KEY (\`departmentId\`) REFERENCES \`department\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`site\` ADD CONSTRAINT \`FK_2aa8e18a61561169ffaf7b3168b\` FOREIGN KEY (\`regionId\`) REFERENCES \`region\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`route\` ADD CONSTRAINT \`FK_be93cd23d40f385d48002e3a38e\` FOREIGN KEY (\`levelId\`) REFERENCES \`level\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`route\` ADD CONSTRAINT \`FK_e6b7ac0e97d367b5c453874e89b\` FOREIGN KEY (\`secteurId\`) REFERENCES \`secteur\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`route\` ADD CONSTRAINT \`FK_34eb5ab06c86049646965679eb6\` FOREIGN KEY (\`equipmentId\`) REFERENCES \`equipment\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`route\` ADD CONSTRAINT \`FK_4a943f37a1669ae90abd4c6a6db\` FOREIGN KEY (\`engagementId\`) REFERENCES \`engagement\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`route\` ADD CONSTRAINT \`FK_28f77e1e2011ecfa30f0663fc22\` FOREIGN KEY (\`expositionId\`) REFERENCES \`exposition\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`route\` ADD CONSTRAINT \`FK_fa794ac37260c9485315981a6f5\` FOREIGN KEY (\`rockTypeId\`) REFERENCES \`rock_type\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`route\` ADD CONSTRAINT \`FK_c5b9f9a095d9dbb56e64c43ac6a\` FOREIGN KEY (\`routeProfileId\`) REFERENCES \`route_profile\`(\`id\`) ON DELETE NO ACTION ON UPDATE NO ACTION`);
        await queryRunner.query(`ALTER TABLE \`site_expositions_exposition\` ADD CONSTRAINT \`FK_274dc6813356a68b9605973b975\` FOREIGN KEY (\`siteId\`) REFERENCES \`site\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`site_expositions_exposition\` ADD CONSTRAINT \`FK_7005cc2e6026b2bc3a7dc1713fa\` FOREIGN KEY (\`expositionId\`) REFERENCES \`exposition\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`site_route_profiles_route_profile\` ADD CONSTRAINT \`FK_6a2b74aa55e589a23bb8c54c739\` FOREIGN KEY (\`siteId\`) REFERENCES \`site\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
        await queryRunner.query(`ALTER TABLE \`site_route_profiles_route_profile\` ADD CONSTRAINT \`FK_718a6089f3ac0e2ec36d36313c0\` FOREIGN KEY (\`routeProfileId\`) REFERENCES \`route_profile\`(\`id\`) ON DELETE CASCADE ON UPDATE CASCADE`);
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.query(`ALTER TABLE \`site_route_profiles_route_profile\` DROP FOREIGN KEY \`FK_718a6089f3ac0e2ec36d36313c0\``);
        await queryRunner.query(`ALTER TABLE \`site_route_profiles_route_profile\` DROP FOREIGN KEY \`FK_6a2b74aa55e589a23bb8c54c739\``);
        await queryRunner.query(`ALTER TABLE \`site_expositions_exposition\` DROP FOREIGN KEY \`FK_7005cc2e6026b2bc3a7dc1713fa\``);
        await queryRunner.query(`ALTER TABLE \`site_expositions_exposition\` DROP FOREIGN KEY \`FK_274dc6813356a68b9605973b975\``);
        await queryRunner.query(`ALTER TABLE \`route\` DROP FOREIGN KEY \`FK_c5b9f9a095d9dbb56e64c43ac6a\``);
        await queryRunner.query(`ALTER TABLE \`route\` DROP FOREIGN KEY \`FK_fa794ac37260c9485315981a6f5\``);
        await queryRunner.query(`ALTER TABLE \`route\` DROP FOREIGN KEY \`FK_28f77e1e2011ecfa30f0663fc22\``);
        await queryRunner.query(`ALTER TABLE \`route\` DROP FOREIGN KEY \`FK_4a943f37a1669ae90abd4c6a6db\``);
        await queryRunner.query(`ALTER TABLE \`route\` DROP FOREIGN KEY \`FK_34eb5ab06c86049646965679eb6\``);
        await queryRunner.query(`ALTER TABLE \`route\` DROP FOREIGN KEY \`FK_e6b7ac0e97d367b5c453874e89b\``);
        await queryRunner.query(`ALTER TABLE \`route\` DROP FOREIGN KEY \`FK_be93cd23d40f385d48002e3a38e\``);
        await queryRunner.query(`ALTER TABLE \`site\` DROP FOREIGN KEY \`FK_2aa8e18a61561169ffaf7b3168b\``);
        await queryRunner.query(`ALTER TABLE \`site\` DROP FOREIGN KEY \`FK_14f1366c56de96714e66139270d\``);
        await queryRunner.query(`ALTER TABLE \`site\` DROP FOREIGN KEY \`FK_eb87dc44526a06ca73d6e6c5a49\``);
        await queryRunner.query(`ALTER TABLE \`site\` DROP FOREIGN KEY \`FK_d51a59968499a0132e3bba4ba25\``);
        await queryRunner.query(`ALTER TABLE \`site\` DROP FOREIGN KEY \`FK_9c135c4fcf455a0f8671d1328e3\``);
        await queryRunner.query(`ALTER TABLE \`site\` DROP FOREIGN KEY \`FK_18a0dc586039b403a7bcd59a35f\``);
        await queryRunner.query(`ALTER TABLE \`site\` DROP FOREIGN KEY \`FK_644f7446b537a42d5969d93ad19\``);
        await queryRunner.query(`ALTER TABLE \`site\` DROP FOREIGN KEY \`FK_89b8d72be09808f74d17479eca7\``);
        await queryRunner.query(`ALTER TABLE \`department\` DROP FOREIGN KEY \`FK_aa1c27dc9833cc7b7846a65493a\``);
        await queryRunner.query(`ALTER TABLE \`secteur\` DROP FOREIGN KEY \`FK_fe1988d9ac1fda05119db7f166b\``);
        await queryRunner.query(`DROP INDEX \`IDX_718a6089f3ac0e2ec36d36313c\` ON \`site_route_profiles_route_profile\``);
        await queryRunner.query(`DROP INDEX \`IDX_6a2b74aa55e589a23bb8c54c73\` ON \`site_route_profiles_route_profile\``);
        await queryRunner.query(`DROP TABLE \`site_route_profiles_route_profile\``);
        await queryRunner.query(`DROP INDEX \`IDX_7005cc2e6026b2bc3a7dc1713f\` ON \`site_expositions_exposition\``);
        await queryRunner.query(`DROP INDEX \`IDX_274dc6813356a68b9605973b97\` ON \`site_expositions_exposition\``);
        await queryRunner.query(`DROP TABLE \`site_expositions_exposition\``);
        await queryRunner.query(`DROP INDEX \`IDX_e12875dfb3b1d92d7d7c5377e2\` ON \`user\``);
        await queryRunner.query(`DROP TABLE \`user\``);
        await queryRunner.query(`DROP INDEX \`IDX_99935ab824cba9096f178988dc\` ON \`equipment\``);
        await queryRunner.query(`DROP TABLE \`equipment\``);
        await queryRunner.query(`DROP TABLE \`route\``);
        await queryRunner.query(`DROP INDEX \`IDX_b1644a53747694faf5869b0394\` ON \`level\``);
        await queryRunner.query(`DROP TABLE \`level\``);
        await queryRunner.query(`DROP INDEX \`IDX_9669a09fcc0eb6d2794a658f64\` ON \`site\``);
        await queryRunner.query(`DROP TABLE \`site\``);
        await queryRunner.query(`DROP INDEX \`IDX_3bbe18bbcf18cf9ccb9a02eba6\` ON \`approach_type\``);
        await queryRunner.query(`DROP TABLE \`approach_type\``);
        await queryRunner.query(`DROP TABLE \`department\``);
        await queryRunner.query(`DROP TABLE \`region\``);
        await queryRunner.query(`DROP INDEX \`IDX_63f3b02799a16a09851e6eee8e\` ON \`secteur\``);
        await queryRunner.query(`DROP TABLE \`secteur\``);
        await queryRunner.query(`DROP INDEX \`IDX_8ebddfc1bc8400247a43785176\` ON \`rock_type\``);
        await queryRunner.query(`DROP TABLE \`rock_type\``);
        await queryRunner.query(`DROP INDEX \`IDX_336dad01ab7e3ea1a0c0e2ed69\` ON \`engagement\``);
        await queryRunner.query(`DROP TABLE \`engagement\``);
        await queryRunner.query(`DROP INDEX \`IDX_f7619fc5ea6e0cad7b57140bfd\` ON \`route_profile\``);
        await queryRunner.query(`DROP TABLE \`route_profile\``);
        await queryRunner.query(`DROP INDEX \`IDX_50aaaf23ba3e63c19c565451b4\` ON \`exposition\``);
        await queryRunner.query(`DROP TABLE \`exposition\``);
    }

}
