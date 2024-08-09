#!/bin/sh
cd api/data && ./fetch.sh
docker compose up
