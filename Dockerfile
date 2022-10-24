FROM node:16

# app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY tsconfig.json ./

RUN npm install
#RUN npm ci --only=production

# copy bundle
COPY . .

EXPOSE 8080.
CMD ["npm", "run", "build"]
RUN pwd
RUN ls -altr
CMD [ "node", "dist/app.js" ]

