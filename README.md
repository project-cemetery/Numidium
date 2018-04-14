[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![Build Status](https://travis-ci.org/QEEP-Pro/Numidium.svg?branch=master)](https://travis-ci.org/QEEP-Pro/Numidium)

# Numidium

Roadmap and tasks on [Trello board](https://trello.com/b/tOSS7V7z).

## Development

+ `git clone git@github.com:QEEP-Pro/Numidium.git`
+ `cd Numidium/app`
+ `composer install -o`
+ `php bin/console doctrine:database:create`
+ `php bin/console doctrine:migrations:migrate`
+ `php bin/console app:create-admin example@email.com pa$$word1`
+ `php bin/console server:start`
+ `yarn install`
+ `yarn watch`

### Tests (in app dir)
+ `php bin/phpunit --coverage-text`
+ `yarn test`
