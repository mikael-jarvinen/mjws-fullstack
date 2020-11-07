FROM node:latest

RUN mkdir mjws-fullstack

ADD . /mjws-fullstack

RUN cd mjws-fullstack && npm install && npm run build

WORKDIR /mjws-fullstack
EXPOSE 3000
CMD ["npm", "run", "start"]