FROM node:14

WORKDIR /test

ARG NPM_TOKEN

ENV NPM_TOKEN=${NPM_TOKEN}

COPY . .

RUN yarn install

EXPOSE 8000

CMD ["yarn","dev"]