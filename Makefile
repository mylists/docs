# Variables
IMAGE_NAME ?= mylists/docs
TAG ?= latest
PLATFORMS ?= linux/amd64,linux/arm64
BUILDER_NAME ?= docs-multiarch-builder
PORT ?= 8080
DOCKERFILE ?= docker/Dockerfile

.PHONY: help all install start build serve test clean docker-build docker-buildx-builder docker-buildx docker-buildx-push docker-run

# Default target
all: install test build

help: ## Show this help message
	@echo "Available commands:"
	@awk 'BEGIN {FS = ":.*?## "}; /^[a-zA-Z_-]+:.*?## .*$$/ {printf "  \033[36m%-20s\033[0m %s\n", $$1, $$2}' $(MAKEFILE_LIST)

install: ## Install npm dependencies cleanly
	npm ci

start: ## Start local Docusaurus development server
	npm run start

build: ## Build static production site
	npm run build

serve: ## Preview built production site locally
	npm run serve

test: ## Run test suite
	npm test

clean: ## Remove build outputs and docusaurus cache
	rm -rf build .docusaurus

docker-build: ## Build single-platform Docker image locally
	docker build -f $(DOCKERFILE) -t $(IMAGE_NAME):$(TAG) .

docker-buildx-builder: ## Setup Docker Buildx builder instance for multi-platform builds
	@docker buildx inspect $(BUILDER_NAME) >/dev/null 2>&1 || docker buildx create --name $(BUILDER_NAME) --use
	@docker buildx use $(BUILDER_NAME)

docker-buildx: docker-buildx-builder ## Build multi-platform Docker image without pushing (linux/amd64, linux/arm64)
	docker buildx build --platform $(PLATFORMS) -f $(DOCKERFILE) -t $(IMAGE_NAME):$(TAG) .

docker-buildx-push: docker-buildx-builder ## Build and push multi-platform Docker image to registry
	docker buildx build --platform $(PLATFORMS) -f $(DOCKERFILE) -t $(IMAGE_NAME):$(TAG) --push .

docker-run: ## Run Docker container locally on specified PORT (default 8080)
	docker run --rm -it -p $(PORT):80 $(IMAGE_NAME):$(TAG)
