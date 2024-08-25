#!/bin/bash

# Name of the Docker image
IMAGE_NAME="user-events"

# Build the Docker image
docker build -t $IMAGE_NAME .

# Print success message
echo "Docker image '$IMAGE_NAME' built successfully."
