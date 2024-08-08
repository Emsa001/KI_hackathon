FROM alpine:latest
WORKDIR /mnt
RUN apk add python3 py3-virtualenv && virtualenv -p python3 venv
RUN venv/bin/pip install lxml requests beautifulsoup4
RUN venv/bin/activate && python3 data_fetch.py
