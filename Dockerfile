FROM node:16

# app directory
WORKDIR /usr/src/app

# Install app dependencies
COPY package.json ./
COPY tsconfig.json ./

RUN npm install
RUN npm install -g typescript 
#RUN npm ci --only=production

# copy bundle
COPY . .


CMD ["npm", "run", "build"]
RUN pwd
RUN ls -altr


EXPOSE 8080
