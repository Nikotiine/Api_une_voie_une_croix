<p align="center">
  <a href="http://nestjs.com/" target="blank"><img src="https://nestjs.com/img/logo-small.svg" width="200" alt="Nest Logo" /></a>
</p>

[circleci-image]: https://img.shields.io/circleci/build/github/nestjs/nest/master?token=abc123def456
[circleci-url]: https://circleci.com/gh/nestjs/nest

  <p align="center">A progressive <a href="http://nodejs.org" target="_blank">Node.js</a> framework for building efficient and scalable server-side applications.</p>
    <p align="center">
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/v/@nestjs/core.svg" alt="NPM Version" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/l/@nestjs/core.svg" alt="Package License" /></a>
<a href="https://www.npmjs.com/~nestjscore" target="_blank"><img src="https://img.shields.io/npm/dm/@nestjs/common.svg" alt="NPM Downloads" /></a>
<a href="https://circleci.com/gh/nestjs/nest" target="_blank"><img src="https://img.shields.io/circleci/build/github/nestjs/nest/master" alt="CircleCI" /></a>
<a href="https://coveralls.io/github/nestjs/nest?branch=master" target="_blank"><img src="https://coveralls.io/repos/github/nestjs/nest/badge.svg?branch=master#9" alt="Coverage" /></a>
<a href="https://discord.gg/G7Qnnhy" target="_blank"><img src="https://img.shields.io/badge/discord-online-brightgreen.svg" alt="Discord"/></a>
<a href="https://opencollective.com/nest#backer" target="_blank"><img src="https://opencollective.com/nest/backers/badge.svg" alt="Backers on Open Collective" /></a>
<a href="https://opencollective.com/nest#sponsor" target="_blank"><img src="https://opencollective.com/nest/sponsors/badge.svg" alt="Sponsors on Open Collective" /></a>
  <a href="https://paypal.me/kamilmysliwiec" target="_blank"><img src="https://img.shields.io/badge/Donate-PayPal-ff3f59.svg"/></a>
    <a href="https://opencollective.com/nest#sponsor"  target="_blank"><img src="https://img.shields.io/badge/Support%20us-Open%20Collective-41B883.svg" alt="Support us"></a>
  <a href="https://twitter.com/nestframework" target="_blank"><img src="https://img.shields.io/twitter/follow/nestframework.svg?style=social&label=Follow"></a>
</p>
  <!--[![Backers on Open Collective](https://opencollective.com/nest/backers/badge.svg)](https://opencollective.com/nest#backer)
  [![Sponsors on Open Collective](https://opencollective.com/nest/sponsors/badge.svg)](https://opencollective.com/nest#sponsor)-->

## Description

## Api rest projet => une voie une croix

## Installation
* Creer un .env avec les information de configuration de la bdd (my sql)
  * PORT_DEV=[votre port localhost de dev]
  * DATABASE_HOST=[localhost si docker-compose]
  * DATABASE_PORT=[3306 si docker-compose]
  * DATABASE_USER=[user de la database , si docker-compose pas de mdp pour la bdd]
  * DATABASE_NAME=[le nom de votre bdd]
  * ACCESS_TOKEN_SECRET_KEY=[]
  * BCRYPT_SALT=[]

Exemple :
```bash
PORT_DEV=3000
DATABASE_HOST=localhost
DATABASE_PORT=3306
DATABASE_USER=root
DATABASE_NAME=climbing
DATABASE_PASSWORD=''
ACCESS_TOKEN_SECRET_KEY=key
BCRYPT_SALT=10
```
  
```bash
# install dependencies
$ npm install

# start database container docker first time
$ docker-compose up -d

# create database
$ npm run db:create

# run migration
$ npm run migration:run

# run seed
$ npm run seed:run
```

## Running the app

```bash
# development
$ npm run start

# watch mode
$ npm run dev

# production mode
$ npm run start:prod
```
## Mise en route & verification
```bash
# Verifie que le serveur tournne
$ localhost:[PORT_DEV] => hello world

# Verfie que Swagger tourne et affiche les routes disponibles
$ localhost:[PORT_DEV]/api => swagger

# Php My admin pour gestion de la bdd 
$ localhost:8080 => phpMyAdmin
```

## CLI Docker
```bash
# Start your docker engine and run the command line ( just one time )
$ docker-compose up -d 

# if you run docker-compose up -d after you have just do 
# start database
$ docker-compose start

# stop database
$ docker-compose stop

# Destroy the container
$ docker-compose down
```

## CLI TypeORM
```bash
# create database
$ npm run db:create

# drop database
$ npm run db:drop

# Generate mrigration for entity change
$ npm run migration:generate

# Generate your own migration 
$ npm run migration:create

# Run the mirgration 
$ npm run migration:run

# Revert last migration 
$ npm run migration:revert
```

## CLI Seed
```bash
# Run the seed
$ npm run seed:run
```
## Test

```bash
# unit tests
$ npm run test

# e2e tests
$ npm run test:e2e

# test coverage
$ npm run test:cov
```

## Support

Nest is an MIT-licensed open source project. It can grow thanks to the sponsors and support by the amazing backers. If you'd like to join them, please [read more here](https://docs.nestjs.com/support).

## Contributeurs

-  [Nicolas Godin](https://nicolas-godin.fr/)


## License

Nest is [MIT licensed](LICENSE).
