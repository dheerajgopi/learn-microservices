#!/bin/sh

# Run the MySQL container, with a database named 'users' and credentials
# for a users-service user which can access it.
echo "Starting DB..."
docker run --name db -d -e MYSQL_ROOT_PASSWORD=123 -e MYSQL_ROOT_DATABASE=123 -e MYSQL_DATABASE=users -e MYSQL_USER=users_service -e MYSQL_PASSWORD=123 \
  -p 3307:3306 \
  mysql:latest

# Wait for the database service to start up.
echo "Waiting for DB to start up..."
#docker exec db mysqladmin --silent --wait=30 -uusers_service -p123

# Run the setup script.
echo "Setting up initial data..."
docker exec -i db mysql -uusers_service -p123 users < setup.sql
#docker exec -i db mysql -uusers_service users < setup.sql
