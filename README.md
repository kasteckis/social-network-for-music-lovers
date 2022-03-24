# Social network for music lovers!
<b>What is it?</b>

Social network dedicated specifically for music lovers! This website was specifically designed and created around everything that happens in music culture.

<img src="./readme.gif" width="350">

# What has been used?
1. Symfony (PHP)
2. React
3. Cypress for E2E tests
4. PHPUnit for unit tests
5. MySQL 8

# Setup
1. `docker-compose up`
2. `docker exec -it music_web bash`
3. `composer install`
4. `yarn install`
5. `yarn build` (`or yarn watch`)
6. `bin/console lexik:jwt:generate-keypair`
7. `bin/console app:create-user admin@admin.dev admin admin`
8. Visit `localhost` or `192.168.10.2`

# Commands
1. bin/console gesdinet:jwt:clear - delete expired JWT tokens from database
2. bin/console app:reload-top40 - refresh TOP40 once a week
