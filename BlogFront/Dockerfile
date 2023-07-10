# Base image
FROM node:14-alpine

WORKDIR /app

COPY . .

RUN npm install

CMD ["npm", "run", "dev"]
