#!/bin/sh

# Wait until Postgres is ready
echo "Waiting for Postgres..."

while ! nc -z db 5432; do
  sleep 1
done

echo "Postgres is up — starting FastAPI"
exec "$@"
