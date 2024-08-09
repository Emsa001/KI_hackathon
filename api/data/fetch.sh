#!/bin/sh

# only fetch when necessary
[ -d "../public/maps" ] && exit

# run fetch inside docker
set -e
docker build . -t d
docker run -v .:/mnt d
mv maps ../public/
