#!/bin/bash
set -e

ENV=$1    # dev or prod
TARGET=$2 # backend, frontend, or all

run_cmd() {
    local dir=$1
    local script=$2
    cd "$dir" && npm run "$script"
}

# Run single targets
if [ "$TARGET" == "backend" ]; then
    run_cmd "backend" "$ENV"
    exit 0
fi

if [ "$TARGET" == "frontend" ]; then
    run_cmd "frontend" "$ENV"
    exit 0
fi

# Run everything concurrently if target is 'all' or empty
echo "🚀 Launching unified ($ENV) stack..."
npx concurrently \
    -n "backend,frontend" \
    -c "blue,green" \
    "cd backend && npm run $ENV" \
    "cd frontend && npm run $ENV"

