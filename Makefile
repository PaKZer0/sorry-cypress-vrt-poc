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

sorry-simple:
	./simple_vrt.sh `cat /proc/sys/kernel/random/uuid` src/cypress/integration/spec.ts

sorry-simple-vrt:
	./simple_vrt.sh `cat /proc/sys/kernel/random/uuid` src/cypress/integration/simple-vrt.ts
