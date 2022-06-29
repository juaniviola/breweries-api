FROM node:16.15-alpine3.14
WORKDIR /usr/src/app
COPY package*.json ./
RUN yarn install
COPY . .
EXPOSE 8000
CMD ["yarn", "start"]
