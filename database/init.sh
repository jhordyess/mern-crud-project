#!/bin/bash

# MongoDB Replica Set Initialization Script
#--------------------------------------------------------------
# Automates MongoDB replica set setup, required to communicate with Prisma.
# Can be adapted into a Dockerfile for creating primary and secondary nodes.
# Use 'rs.add("<host>")' to add secondary nodes.
# Ensure secondary nodes run with 'mongod --replSet <MONGO_REPLICA_ID> --bind_ip localhost,<host>'.

# For more info:
# - MongoDB Docker Compatibility: https://www.mongodb.com/compatibility/deploying-a-mongodb-cluster-with-docker
# - Replica Set Tutorial: https://docs.mongodb.com/manual/tutorial/deploy-replica-set/
# - Script based on Dockerfile: https://github.com/prisma/prisma/tree/main/docker

# Check if required environment variables are set
echo "Checking if required environment variables are set..."
if [[ -z "${MONGO_REPLICA_ID}" || -z "${MONGO_REPLICA_HOST}" || -z "${MONGO_INITDB_ROOT_USERNAME}" || -z "${MONGO_INITDB_ROOT_PASSWORD}" ]]; then
  echo "Error: One or more required environment variables are not set."
  exit 1
fi

# Start MongoDB replica set
echo "Starting MongoDB replica set..."
mongod --replSet ${MONGO_REPLICA_ID} --bind_ip localhost,${MONGO_REPLICA_HOST} &
MONGOD_PID=$!

# Wait for MongoDB to start
until (mongosh --eval "print('Waiting for MongoDB to start...')"); do
  sleep 1
done

# Initiate replica set
echo "Initiating replica set..."
mongosh admin <<JS
rs.initiate({
  _id: '${MONGO_REPLICA_ID}',
  members: [
    {
      _id: 0,
      host: '${MONGO_REPLICA_HOST}',
    }
  ],
})
JS

# Create root user
echo "Creating root user..."
mongosh admin <<JS
db.createUser({
  user: '${MONGO_INITDB_ROOT_USERNAME}',
  pwd: '${MONGO_INITDB_ROOT_PASSWORD}',
  roles: ['root'],
})
JS

# Finish replica set initiation
echo "Replica set initiated."

# Wait for MongoDB process to finish
wait $MONGOD_PID
