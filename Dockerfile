FROM cypress/base:22.11.0

RUN mkdir /app
WORKDIR /app

COPY . /app

RUN npm install

RUN node_modules/.bin/cypress verify

RUN ["npm", "run", "cypress:e2e"]