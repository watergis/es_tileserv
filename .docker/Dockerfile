FROM node:12

WORKDIR /usr/src/app

# install npm package
COPY ./package*.json ./
RUN npm install

# copy source code into Docker container
COPY . .

# install pm2
RUN npm install -g pm2

EXPOSE 8080

# launch pm2
CMD ["pm2", "--no-daemon", "start", "pm2.json","--env","production"]