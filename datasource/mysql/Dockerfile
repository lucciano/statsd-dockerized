FROM debian:8
RUN apt-get update && apt-get install -yq git wget tmux vim nodejs npm

RUN npm install -g n

RUN n stable

WORKDIR /opt/datasource

EXPOSE 8000

RUN npm install -g nodemon

CMD npm install && nodemon index.js

