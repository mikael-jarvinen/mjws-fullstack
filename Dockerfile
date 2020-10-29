FROM node:latest

RUN apt-get update && apt-get install -y git \
    && git clone https://github.com/usermine12/mjws-frontend \
    && cd mjws-frontend && npm install && npm run build

WORKDIR /mjws-frontend
EXPOSE 3000
CMD ["npm", "run", "start"]