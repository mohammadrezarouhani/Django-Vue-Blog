# Base image
FROM node:14-alpine

WORKDIR /app

COPY . .

RUN npm install

EXPOSE 5473

CMD ["npm", "run", "dev"]
