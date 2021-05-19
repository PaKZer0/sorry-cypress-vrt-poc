start:
	docker-compose up -d

stop:
	docker-compose down

migration-logs:
	docker-compose logs migration

removedata:
	sudo rm -fR imageUploads/ db/ data/

simple-vrt:
	npx cypress run --spec src/cypress/integration/simple-vrt.ts
