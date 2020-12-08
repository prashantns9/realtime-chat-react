FROM node:8-alpine
RUN mkdir -p /usr/src/app
WORKDIR /usr/src/app
COPY package.json .
COPY tsconfig.json .
ADD src ./src
ADD public ./public
RUN npm install
EXPOSE 3000
RUN npm run tsc
CMD [ "node", "dist/index.js" ]