FROM node:16

# Create app directory
WORKDIR /usr/src/app

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
# COPY package*.json ./

# If you are building your code for production
# RUN npm ci --only=production

# Bundle app source
# COPY . .
RUN git clone https://github.com/JoxTorn/discord-bot.git

RUN npm install

#CMD [ "node", "index.js" ]