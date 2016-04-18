#!/bin/bash

MONGO_IMAGE=$(docker run -t -d mongo)

docker logs --follow $MONGO_IMAGE 2>&1 & docker run --link "${MONGO_IMAGE}:mongo" -p 3000:3000 -p 5001:5001 -p 5002:5002 -t huygensing/beverland-design-sprint
