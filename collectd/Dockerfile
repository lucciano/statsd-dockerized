FROM debian:8
RUN apt-get update && apt-get install -yq collectd
CMD collectd -C /etc/collectd/collectd.conf
