FROM node:14

WORKDIR /app

RUN npm install nodemon -g

COPY ["package.json", "package-lock.json", "./"]

RUN npm install

COPY [".", "./"]

CMD ["nodemon", "start"]
