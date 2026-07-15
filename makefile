# --- SHELL CONFIGURATION ---
SHELL := /bin/bash
SCRIPT_DIR = ./scripts

# --- DEFAULT TARGET ---
.PHONY: all
all: install build

# --- INSTALLATION ---
.PHONY: install install-backend install-frontend

install:
	@$(SCRIPT_DIR)/install.sh all

install-backend:
	@$(SCRIPT_DIR)/install.sh backend

install-frontend:
	@$(SCRIPT_DIR)/install.sh frontend

# --- BUILD ---
.PHONY: build build-backend build-frontend

build:
	@$(SCRIPT_DIR)/build.sh all

build-backend:
	@$(SCRIPT_DIR)/build.sh backend

build-frontend:
	@$(SCRIPT_DIR)/build.sh frontend

# --- DEVELOPMENT (DEV) ---
.PHONY: dev dev-backend dev-frontend

dev:
	@$(SCRIPT_DIR)/run.sh dev all

dev-backend:
	@$(SCRIPT_DIR)/run.sh dev backend

dev-frontend:
	@$(SCRIPT_DIR)/run.sh dev frontend

# --- PRODUCTION (PROD) ---
.PHONY: prod prod-backend prod-frontend

prod: build
	@$(SCRIPT_DIR)/run.sh start all

prod-backend: build-backend
	@$(SCRIPT_DIR)/run.sh start backend

prod-frontend: build-frontend
	@$(SCRIPT_DIR)/run.sh start frontend

# --- CLEAN ---
.PHONY: clean clean-backend clean-frontend

clean:
	@$(SCRIPT_DIR)/clean.sh all

clean-backend:
	@$(SCRIPT_DIR)/clean.sh backend

clean-frontend:
	@$(SCRIPT_DIR)/clean.sh frontend
