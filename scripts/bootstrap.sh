#!/usr/bin/env bash
printenv

exec /mysql.sh &
sleep 3

cd /var/www/html
php bin/console doctrine:database:create -q
php bin/console doctrine:migrations:migrate -q
php bin/console app:create-admin $ADMIN_USER $ADMIN_PASS
