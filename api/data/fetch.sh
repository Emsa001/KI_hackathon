#!/bin/sh
set -e
docker build . -t bs-fetch
docker run -v .:/mnt bs-fetch
