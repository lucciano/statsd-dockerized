FROM debian:8
run apt-get update && apt-get install -yq git nodejs npm

RUN npm install -g n

run apt-get install -yq wget
RUN n stable

RUN git clone https://github.com/etsy/statsd /opt/statsd
RUN wget https://raw.githubusercontent.com/dynmeth/mongo-statsd-backend/master/lib/index.js -O /opt/statsd/backends/mongodb.js

RUN cd /opt/statsd ; npm install --save mongodb
RUN cd /opt/statsd ; npm install --save async

CMD node /opt/statsd/stats.js /opt/config/statsd.config.js
