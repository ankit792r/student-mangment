#!/bin/bash
set -e

TARGET=$1

build_backend() {
    echo "🏗️  Building backend application..."
    cd backend
    bun run build
}

build_frontend() {
    echo "🏗️  Building frontend application..."
    cd frontend && npm run build
}

case "$TARGET" in
    backend)  build_backend ;;
    frontend) build_frontend ;;
    all|*)    build_backend && build_frontend ;;
esac

