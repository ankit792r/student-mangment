#!/bin/bash
set -e # Exit immediately if a command exits with a non-zero status

TARGET=$1

install_backend() {
    echo "📦 Installing backend dependencies..."
    cd backend && bun install
}

install_frontend() {
    echo "📦 Installing frontend dependencies..."
    cd frontend && bun install
}

case "$TARGET" in
    backend)  install_backend ;;
    frontend) install_frontend ;;
    all|*)    install_backend && install_frontend ;;
esac

