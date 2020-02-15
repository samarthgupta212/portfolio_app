FROM  node:carbon

# Create app directory
WORKDIR /usr/src/app

# set timezone to IST
ENV TZ=Asia/Kolkata
RUN ln -snf /usr/share/zoneinfo/$TZ /etc/localtime && echo $TZ > /etc/timezone

ARG CORE_ENV

# Install app dependencies
# A wildcard is used to ensure both package.json AND package-lock.json are copied
# where available (npm@5+)
COPY package*.json ./

COPY environments.json ./

RUN penv $CORE_ENV

RUN npm install
# If you are building your code for production
# RUN npm install --only=production

# Bundle app source
COPY . .

# create build for docker image
RUN npm run clean
RUN npm run build

RUN npm i -g sequelize-cli

ARG PORT
ENV PORT=$PORT

EXPOSE 3000

CMD [ "npm", "start" ]
