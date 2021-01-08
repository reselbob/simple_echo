FROM node:15.4.0-alpine3.10

WORKDIR /app
COPY ./index.js /app
COPY ./package.json /app
RUN npm install --only-production
EXPOSE 3030
CMD node index.js
