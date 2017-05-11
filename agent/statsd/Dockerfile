FROM debian:8
run apt-get update && apt-get install -yq git python-pip

run apt-get install -yq wget

RUN apt-get install -yq python-dev
RUN pip install statsd psutil

CMD python /opt/agent/statsd-agent.py
