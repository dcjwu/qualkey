.PHONY: build

DOCKER_COMPOSE=docker-compose
DOCKER_COMPOSE_RUN=$(DOCKER_COMPOSE) run --rm --no-deps
DOCKER_COMPOSE_RUN_WITH_DEPS=$(DOCKER_COMPOSE) run --rm

dc_app_name = qualkey-db

build:
	cd qk-processing && npm run db:dev:up
