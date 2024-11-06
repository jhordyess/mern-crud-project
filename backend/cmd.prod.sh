#!/bin/sh

# INFO: This script is designed for running the application and migrating the database in a production environment. It requires the following:
# - Having the DATABASE_URL and SECRET environment variable.
# - Having the Prisma CLI installed.

if [ -z "$DATABASE_URL" ]; then
  echo "DATABASE_URL is not set."
  exit 1
fi

if [ -z "$SECRET" ]; then
  echo "SECRET is not set."
  exit 1
fi

# Get the database host and port
DB_HOST_PORT=$(echo $DATABASE_URL | awk -F '[@/]' '{print $4}')
DB_HOST=${DB_HOST_PORT%:*}
DB_PORT=${DB_HOST_PORT#*:}

echo "Checking and waiting for the database..."
until nc -z $DB_HOST $DB_PORT; do
  sleep 1
done
echo "Database is up and running!"

echo "Generating schema..."
yarn prisma generate
echo "Schema generated successfully."

echo "Starting the server..."
yarn start
