FROM node:16.13.0-alpine

WORKDIR /app

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY . .

EXPOSE 3333

CMD ["npm", "run", "start:dev"]
