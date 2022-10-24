FROM node:10-alpine

# update packages
RUN apk update

# create root application folder
WORKDIR /app

# copy configs to /app folder
COPY package*.json ./
COPY tsconfig.json ./
# copy source code to /app/src folder
COPY src /app/src

# check files list
RUN ls -a
RUN pwd

RUN npm install
RUN npm run build

RUN ls -a
RUN pwd

EXPOSE 8080

CMD [ "node", "./dist/app.js" ]
