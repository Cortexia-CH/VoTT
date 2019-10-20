#!make
# Default values, can be overridden either on the command line of make
# or in .env

VERSION:=$(shell python update_release.py -v)
BRANCH?=master

check-env:
ifeq ($(wildcard .env),)
	@echo ".env file is missing. Create it first"
	@exit 1
else
include .env
export
endif

init:
	cp .env.sample .env

init-githook:
	cp update_release.py .git/hooks/pre-commit
	cd .git/hooks/ && ln -s ../../versions.py

vars: check-env
	@echo '  PUBLIC_URL=${SUBDOMAIN}.${DOMAIN}'
	@echo '  REACT_APP_INSTRUMENTATION_KEY=$(REACT_APP_INSTRUMENTATION_KEY)'
	@echo '  REACT_APP_API_URL=$(REACT_APP_API_URL)'


# version management

version: check-env
	@echo $(shell node -pe "require('./package.json').version")-$(VERSION)

version-up:
	@python update_release.py

check-release: check-env
	# make sure we are in $(BRANCH)
	@python update_release.py check --branch=$(BRANCH)

	git pull

	# update versions and ask for confirmation
	@python update_release.py

	VERSION=$(shell python update_release.py -v)

	@echo Version used will be $(VERSION)

	@python update_release.py confirm

create-release: check-release
	# create branch and tag
	git checkout -b release-$(VERSION)
	git add .
	git commit -m "Prepared release $(VERSION)"
	git push --set-upstream origin release-$(VERSION)

	git tag $(VERSION)
	git tag -f qa
	git push --tags --force

	# git merge $(BRANCH)
	git checkout $(BRANCH)
	git merge release-$(VERSION)
	git push


# deployment to prod

config-prod:
	DOCKER_TAG=prod  \
		SUBDOMAIN=vott \
		DOMAIN=cortexia.io \
		REACT_APP_INSTRUMENTATION_KEY=$(REACT_APP_INSTRUMENTATION_KEY) \
		REACT_APP_API_URL=https://backend.cortexia.io \
		STACK_NAME=vott \
		TRAEFIK_PUBLIC_TAG=traefik-public \
		TRAEFIK_PUBLIC_NETWORK=traefik-public \
		BUILDTIME_CORTEXIA_VERSION=$(VERSION) \
		CORTEXIA_VERSION=$(VERSION) \
		ENVIRONMENT=prod \
		NODE_ENV=production \
		docker-compose \
			-f docker-compose.deploy.yml \
			-f docker-compose.deploy.networks.yml \
		config > docker-stack.yml

push-prod: login config-prod
	@# confirm push to production
	@python update_release.py confirm --prod

	# update tags
	git tag -f prod
	git push --tags --force

	# build and push docker image
	docker-compose -f docker-stack.yml build
	docker-compose -f docker-stack.yml push

deploy-prod: config-prod
	docker-auto-labels docker-stack.yml
	docker stack deploy -c docker-stack.yml --with-registry-auth vott


# deployment to qa

config-qa:
	DOCKER_TAG=qa  \
		SUBDOMAIN=vott-qa \
		DOMAIN=cortexia.io \
		REACT_APP_INSTRUMENTATION_KEY=$(REACT_APP_INSTRUMENTATION_KEY) \
		REACT_APP_API_URL=https://backend-qa.cortexia.io \
		STACK_NAME=vott-qa \
		TRAEFIK_PUBLIC_TAG=traefik-public \
		TRAEFIK_PUBLIC_NETWORK=traefik-public \
		BUILDTIME_CORTEXIA_VERSION=$(VERSION) \
		CORTEXIA_VERSION=$(VERSION) \
		ENVIRONMENT=dev \
		NODE_ENV=production \
		docker-compose \
			-f docker-compose.deploy.yml \
			-f docker-compose.deploy.networks.yml \
		config > docker-stack.yml

push-qa: login config-qa
	# update tags
	git tag -f qa
	git push --tags --force

	# build docker image
	docker-compose -f docker-stack.yml build
	DOCKER_TAG=qa docker-compose -f docker-stack.yml push

deploy-qa: config-qa
	docker-auto-labels docker-stack.yml
	docker stack deploy -c docker-stack.yml --with-registry-auth vott-qa


# deployment to dev

config-dev:
	DOCKER_TAG=latest  \
		SUBDOMAIN=vott-dev \
		DOMAIN=cortexia.io \
		REACT_APP_INSTRUMENTATION_KEY=$(REACT_APP_INSTRUMENTATION_KEY) \
		REACT_APP_API_URL=https://mocks.cortexia.io \
		STACK_NAME=vott-dev \
		TRAEFIK_PUBLIC_TAG=traefik-public \
		TRAEFIK_PUBLIC_NETWORK=traefik-public \
		BUILDTIME_CORTEXIA_VERSION=$(VERSION) \
		CORTEXIA_VERSION=$(VERSION) \
		ENVIRONMENT=dev \
		NODE_ENV=development \
		docker-compose \
			-f docker-compose.deploy.yml \
			-f docker-compose.deploy.networks.yml \
		config > docker-stack.yml

push-dev: login config-dev
	# update tags
	git tag -f latest
	git push --tags --force

	# build docker image
	docker-compose -f docker-stack.yml build
	DOCKER_TAG=latest docker-compose -f docker-stack.yml push

deploy-dev: config-dev
	docker-auto-labels docker-stack.yml
	docker stack deploy -c docker-stack.yml --with-registry-auth vott-dev

# docker shortcuts for maintenance purpose

login:
	docker login

ps:
	docker ps --format 'table {{.Image}}\t{{.Status}}\t{{.Ports}}\t{{.Names}}'


# docker shortcuts for development purpose

pull: check-env
	rm -rf build node_modules
	docker-compose -f docker-compose.dev.yml build --build-arg BUILDTIME_CORTEXIA_VERSION=$(VERSION) --pull

build: check-env
	docker-compose -f docker-compose.dev.yml build --build-arg BUILDTIME_CORTEXIA_VERSION=$(VERSION)

up: check-env
	docker-compose -f docker-compose.dev.yml up -d

down:
	docker-compose -f docker-compose.dev.yml down

stop:
	docker-compose -f docker-compose.dev.yml stop

logs:
	docker-compose -f docker-compose.dev.yml logs --tail 20 -f

