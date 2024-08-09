#!/bin/sh

# only fetch when necessary
mkdir -p ../public
[ -d "../public/maps" ] && exit

# run fetch inside docker
set -e
docker build . -t d
docker run -v .:/mnt d
mv maps ../public/
