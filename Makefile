start:
	docker-compose up -d

stop:
	docker-compose down

migration-logs:
	docker logs vrtpoc_migration_1

removedata:
	sudo rm -fR imageUploads/ db/ data/
