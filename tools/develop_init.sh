#!/bin/bash

# This script should be ran only 1 time after the first docker compose build

cd /var/www/html
composer install # Uncomment this if you have composer already setup
yarn install
yarn build
php bin/console d:s:u --force # Uncomment this if you want to update database scheme on every docker compose up
# php bin/console doctrine:fixtures:load --append # Uncomment this if you want to add fixtures on every docker compose up
echo "Project has been started"
echo "Access project website - http://192.168.10.2/"
echo "MYSQL Server - 192.168.10.3:3306"
echo "Access phpmyadmin via - http://192.168.10.4/"
echo "Access email server via - http://192.168.10.5:8025/"
echo "Access server SSH by writing - docker exec -it music_web bash"
