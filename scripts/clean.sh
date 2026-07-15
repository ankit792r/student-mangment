#!/bin/bash
TARGET=$1

clean_dir() {
    local dir=$1
    echo "🧹 Wiping $dir artifacts..."
    rm -rf "$dir"/node_modules "$dir"/dist "$dir"/build "$dir"/.cache
}

case "$TARGET" in
    backend)  clean_dir "backend" ;;
    frontend) clean_dir "frontend" ;;
    all|*)    clean_dir "backend" && clean_dir "frontend" ;;
esac

