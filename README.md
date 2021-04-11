Quick startup:
1. docker-compose up
2. docker exec -it music_web bash
3. composer install
4. yarn install
5. yarn build (or yarn watch)
6. php bin/console lexik:jwt:generate-keypair
7. bin/console app:create-user admin@admin.dev admin admin


Cronjobs:
1. bin/console gesdinet:jwt:clear - delete expired jwt tokens from db
2. bin/console app:reload-top40 - kartą per savaitę refreshint top40

Dev notes:
1. bin/console make:admin:crud
