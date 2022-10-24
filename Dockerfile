FROM node:16

# app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY tsconfig.json ./

RUN npm install
#RUN npm ci --only=production
RUN whoami

# copy bundle
COPY . .

EXPOSE 8080
RUN pwd
RUN ls -altr
RUN dist ls -altr
CMD [ "node", "dist/app.js" ]
