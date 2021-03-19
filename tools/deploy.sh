#!/bin/bash

git pull
composer install
bin/console d:s:u --force
yarn install
yarn build
