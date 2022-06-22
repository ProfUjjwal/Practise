FROM node:14

WORKDIR /usr/src/app/

ARG NPM_TOKEN

ENV NPM_TOKEN=${NPM_TOKEN}

COPY . .

RUN yarn install

RUN yarn build

CMD ["yarn", "start"]
