FROM node

# Create app directory
WORKDIR /usr/app

# Install app dependencies
COPY package.json ./

RUN npm install -g typescript
RUN yarn install --prod

# Bundle app source
COPY . .

RUN yarn run build

EXPOSE 6060
CMD [ "node", "build/server.js" ]   
