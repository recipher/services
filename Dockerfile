FROM node:12.13.0-alpine

WORKDIR /app

ENV NODE_ENV production
ENV PATH /app/node_modules/.bin:$PATH
ADD . /app
RUN npm install --silent

EXPOSE 4200
ENTRYPOINT [ "npm", "start" ]

