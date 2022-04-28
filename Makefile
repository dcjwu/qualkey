.PHONY: help go build build-prod start start-prod stop restart shell shell-front shell-db shell-pg migrate dump

DOCKER_COMPOSE=docker-compose
DOCKER_COMPOSE_RUN=$(DOCKER_COMPOSE) run --rm --no-deps
DOCKER_COMPOSE_RUN_WITH_DEPS=$(DOCKER_COMPOSE) run --rm
DOCKER_COMPOSE_DEV=$(DOCKER_COMPOSE) -f docker-compose.yml -f docker-compose.dev.yml
DOCKER_COMPOSE_PROD=$(DOCKER_COMPOSE) -f docker-compose.yml -f docker-compose.prod.yml

processing = qk_processing
db = qualkey_db
front = qk_front

dev_db_user = qualkey
dev_dv_volume = qk_pgdata
dev_db_dump = qk_db-dev-dump.sql

## Help
help:
	@printf "${COLOR_COMMENT}Usage:${COLOR_RESET}\n"
	@printf " make [target]\n\n"
	@printf "${COLOR_COMMENT}Available targets:${COLOR_RESET}\n"
	@awk '/^[a-zA-Z\-\0-9\.@]+:/ { \
		helpMessage = match(lastLine, /^## (.*)/); \
		if (helpMessage) { \
			helpCommand = substr($$1, 0, index($$1, ":")); \
			helpMessage = substr(lastLine, RSTART + 3, RLENGTH); \
			printf " ${COLOR_INFO}%-16s${COLOR_RESET} %s\n", helpCommand, helpMessage; \
		} \
	} \
{ lastLine = $$0 }' $(MAKEFILE_LIST)

## One command to setup and start the project
go: build start dump migrate

## Build project
build:
	$(DOCKER_COMPOSE_DEV) build

## Build project for prod
build-prod:
	$(DOCKER_COMPOSE_PROD) build

## Start project
start:
	$(DOCKER_COMPOSE_DEV) up -d --force-recreate

## Start project for prod
start-prod:
	$(DOCKER_COMPOSE_PROD) up -d --force-recreate

## Stop project
stop:
	$(DOCKER_COMPOSE_DEV) down

## Stop project for prod
stop-prod:
	$(DOCKER_COMPOSE_PROD) down

## Restart project
restart: stop start

## Open processing container command line
shell:
	docker exec -it $(processing) sh

## Open front container command line
shell-front:
	docker exec -it $(front) sh

## Open db container command line
shell-db:
	docker exec -it $(db) bash

## Open postgres cli in db container
shell-pg:
	docker exec -ti $(db) bash -c "psql -U qualkey"

## Run migrations
migrate:
	docker exec -t $(processing) sh -c "npx prisma migrate dev"

## Restore admin database
dump:
	docker cp db.docker/$(dev_db_dump) $(db):/$(dev_dv_volume)
	cat db.docker/$(dev_db_dump) | docker exec -i $(db) psql -U $(dev_db_user)
