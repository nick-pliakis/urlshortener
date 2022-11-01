FROM node:16-alpine

WORKDIR /app

COPY frontend /app
RUN yarn install
RUN cp .env.dist .env

RUN yarn add axios

EXPOSE 80 3000

CMD [ "yarn", "start" ]
