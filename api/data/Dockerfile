FROM alpine:latest

RUN apk add python3 py3-virtualenv

ENV VIRTUAL_ENV=/opt/venv
RUN python3 -m venv $VIRTUAL_ENV
ENV PATH="$VIRTUAL_ENV/bin:$PATH"
# Install dependencies:
COPY requirements.txt .
RUN pip install -r requirements.txt

WORKDIR /mnt
#RUN apk add python3 py3-virtualenv && virtualenv -p python3 venv
#RUN venv/bin/pip install lxml requests beautifulsoup4
#RUN venv/bin/activate && python3 data_fetch.py
CMD ["python3", "data_fetch.py"]
