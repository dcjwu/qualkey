.PHONY: go build build-prod start start-prod stop restart shell shell-front shell-db shell-pg migrate

DOCKER_COMPOSE=docker-compose
DOCKER_COMPOSE_RUN=$(DOCKER_COMPOSE) run --rm --no-deps
DOCKER_COMPOSE_RUN_WITH_DEPS=$(DOCKER_COMPOSE) run --rm
DOCKER_COMPOSE_DEV=$(DOCKER_COMPOSE) -f docker-compose.yml -f docker-compose.dev.yml
DOCKER_COMPOSE_PROD=$(DOCKER_COMPOSE) -f docker-compose.yml -f docker-compose.prod.yml

processing = qk_processing
db = qualkey_db
front = qk_front

## One command to setup and start the project
go: build start migrate

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
